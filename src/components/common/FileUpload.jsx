import { useState, useRef, useEffect, memo, useCallback } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  DownloadIcon,
} from 'lucide-react';
import { X, RotateCcw, Zap } from 'lucide-react';
import DeleteModal from './DeleteModal';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import api from '../../api/axios.instance';
import useAuthStore from '../../store/useAuthStore';
import socket from '../../utils/socket.conn';

// Constants moved outside component to prevent recreation on every render
const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
const supportedFormats = ['.xlsx', '.xls', '.csv'];
const requiredHeaders = ['vehicle_no']; // 🛠️ Change as needed

// Moved validation function outside component since it doesn't depend on component state
const validateVehicleData = (rows, maxRecords = 50) => {
  const errors = [];
  if (rows.length > maxRecords) {
    errors.push(`❌ Max ${maxRecords} records allowed, found ${rows.length}`);
  }

  const seen = new Set();
  const invalidFormatRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,3}-[0-9]{1,4}$/;

  rows.forEach((row, index) => {
    const rowNum = row.__rowNum__ + 1;
    const vehicleNo = row.vehicle_no?.trim().toUpperCase();

    if (!vehicleNo) {
      errors.push(`❌ Row ${rowNum}: Missing vehicle_no`);
    } else {
      if (!invalidFormatRegex.test(vehicleNo)) {
        errors.push(`❌ Row ${rowNum}: Invalid vehicle format (${vehicleNo})`);
      }

      if (seen.has(vehicleNo)) {
        errors.push(`❌ Row ${rowNum}: Duplicate vehicle_no (${vehicleNo})`);
      }

      seen.add(vehicleNo);
    }
  });

  return errors;
};

// Helper function moved outside component
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ExcelDragDrop = ({ link }) => {
  // State management
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [uploadId, setUploadId] = useState('');
  const [progress, setProgress] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const progressref = useRef(progress);
  const user = useAuthStore((state) => state.user);

  // Memoized callbacks to prevent unnecessary recreations
  const calculateProgress = useCallback((data) => {
    const percentage = Math.round((data.processed / data.total) * 100);
    setProgress(percentage);
    progressref.current = percentage; // Keep ref in sync
  }, []);

  const removeFile = useCallback(() => {
    setUploadedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Effects
  useEffect(() => {
    // When progress reaches 100%, remove from localStorage
    if (progress === 100) {
      localStorage.removeItem('rc_uploadId');
    }
  }, [progress]);

  useEffect(() => {
    // Hydration effect
    const savedId = localStorage.getItem('rc_uploadId');
    if (savedId) setUploadId(savedId);
    setHydrated(true);

    return () => {
      if (progressref.current === 100) {
        localStorage.removeItem('rc_uploadId');
      }
    };
  }, []);

  useEffect(() => {
    // Drag and drop handlers
    const handleGlobalDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleGlobalDragLeave = (e) => {
      e.preventDefault();
      if (e.clientX === 0 && e.clientY === 0) {
        setIsDragOver(false);
      }
    };

    const handleGlobalDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    };

    document.body.addEventListener('dragover', handleGlobalDragOver);
    document.body.addEventListener('dragleave', handleGlobalDragLeave);
    document.body.addEventListener('drop', handleGlobalDrop);

    return () => {
      document.body.removeEventListener('dragover', handleGlobalDragOver);
      document.body.removeEventListener('dragleave', handleGlobalDragLeave);
      document.body.removeEventListener('drop', handleGlobalDrop);
    };
  }, []);

  useEffect(() => {
    if (!uploadId) return;

    // Socket connection and event listeners
    const fetchInitialProgress = async () => {
      try {
        const response = await api.get(`/api/upload-progress/${uploadId}`);
        calculateProgress(response.data);
      } catch (error) {
        console.error('Failed to fetch progress', error);
      }
    };

    setHydrated(true);
    fetchInitialProgress();
    socket.emit('join-room', uploadId);

    const onProgress = (data) => {
      calculateProgress(data);
    };

    const onComplete = (data) => {
      console.log('✅ Upload complete:', data);
      toast.success('Excel file processed');
    };

    socket.on('upload-progress', onProgress);
    socket.on('upload-complete', onComplete);

    return () => {
      socket.off('upload-progress', onProgress);
      socket.off('upload-complete', onComplete);
    };
  }, [uploadId, calculateProgress]);

  // File handling functions
  const handleFile = useCallback(
    async (file) => {
      setError('');
      setIsProcessing(true);
      setProgress(0);

      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

      if (!supportedFormats.includes(fileExtension)) {
        setError('Only Excel files (.xlsx, .xls, .csv) are supported.');
        setIsProcessing(false);
        return;
      }

      if (file.size > maxFileSize) {
        setError('File size must be less than 5MB.');
        setIsProcessing(false);
        return;
      }

      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          setError('The Excel sheet is empty or missing data.');
          setIsProcessing(false);
          return;
        }

        // Header validation
        const actualHeaders = Object.keys(jsonData[0]);
        const missingHeaders = requiredHeaders.filter(
          (h) => !actualHeaders.includes(h)
        );
        if (missingHeaders.length > 0) {
          setError(`Missing required columns: ${missingHeaders.join(', ')}`);
          setIsProcessing(false);
          return;
        }

        const errors = validateVehicleData(jsonData);
        if (errors.length > 0) {
          setIsProcessing(false);
          removeFile();
          toast.error(errors[0]);
          return;
        }

        setUploadedFile(file);
        setExcelData(jsonData);
      } catch (err) {
        console.error('Error reading Excel:', err);
        setError('Something went wrong while reading the Excel file.');
      } finally {
        setIsProcessing(false);
      }
    },
    [removeFile]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleCancel = useCallback(() => {
    localStorage.removeItem('rc_uploadId');
    setUploadId('');
  }, []);

  const handleProcessing = useCallback(async () => {
    try {
      setUploadedFile(null);
      removeFile();
      const newUploadId = `${user.gst}_${Date.now()}`;
      localStorage.setItem('rc_uploadId', newUploadId);
      setUploadId(newUploadId);

      await api.post(`/api/upload-excel`, {
        vehicle_list: excelData,
        uploadId: newUploadId,
        user: user.user,
        cmp_year: user.cmp_year,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }, [excelData, removeFile, user]);

  if (!hydrated) return null;

  return (
    <>
      {/* Modern drag overlay */}
      {isDragOver && (
        <div className="fixed inset-0 bg-t1/70 z-50 flex items-center justify-center backdrop-blur-sm">
          {/* Corner borders */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
            (pos) => (
              <div
                key={pos}
                className={`absolute ${pos.split('-')[0]}-8 ${pos.split('-')[1]}-8 w-10 h-10 border-8 border-white rounded-${pos.split('-')[1]}-2xl`}
                style={{
                  borderTop: pos.includes('top') ? '8px solid white' : 'none',
                  borderBottom: pos.includes('bottom')
                    ? '8px solid white'
                    : 'none',
                  borderLeft: pos.includes('left') ? '8px solid white' : 'none',
                  borderRight: pos.includes('right')
                    ? '8px solid white'
                    : 'none',
                }}
              />
            )
          )}
          <h1 className="text-4xl font-bold text-white">Drop Anywhere</h1>
        </div>
      )}

      <div className="max-w-3xl">
        {/* Main upload card with glassmorphism */}
        <div
          className={`border-2 border-dashed rounded-3xl p-8 ${
            uploadedFile
              ? 'bg-white border-emerald-200/50 shadow-2xl shadow-emerald-500/20'
              : isProcessing
                ? 'bg-white border-blue-200/50 shadow-2xl shadow-blue-500/20'
                : 'bg-black'
          } ${isDragOver ? 'scale-105 shadow-3xl' : ''}`}
        >
          {isProcessing ? (
            <ProcessingView />
          ) : uploadedFile ? (
            <UploadCompleteView
              uploadedFile={uploadedFile}
              formatFileSize={formatFileSize}
              removeFile={removeFile}
              handleProcessing={handleProcessing}
              uploadId={uploadId}
            />
          ) : uploadId ? (
            <UploadProgressView
              progress={progress}
              handleCancel={handleCancel}
            />
          ) : (
            <InitialView handleUploadClick={handleUploadClick} link={link} />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Modern error modal */}
      {error && (
        <DeleteModal
          isOpen={!!error}
          onClose={() => {
            setError('');
            removeFile();
          }}
          onConfirm={() => {
            removeFile();
            setTimeout(handleUploadClick, 50);
          }}
          title="Upload Error"
          message={
            <div className="">
              <h4 className="font-semibold text-slate-700 mb-2">
                Requirements:
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Supported formats: .xlsx, .xls, .csv</li>
                <li>• Maximum file size: 5MB</li>
                <li>• File must not be corrupted</li>
                <li>• File should match headers with sample file</li>
              </ul>
            </div>
          }
          confirmButtonText="Try Again"
          cancelButtonText="Cancel"
        />
      )}
    </>
  );
};

// Extracted sub-components for better readability and performance
const ProcessingView = () => (
  <div className="text-center space-y-8">
    <div className="relative w-16 h-16 mx-auto">
      <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      <FileSpreadsheet className="absolute inset-0 m-auto w-7 h-7 text-blue-600" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-4 font-poppins">
        Processing your file...
      </h3>
      <p className="text-slate-600 text-base font-nunito">
        This will just take a moment
      </p>
    </div>
  </div>
);

const UploadCompleteView = ({
  uploadedFile,
  formatFileSize,
  removeFile,
  handleProcessing,
  uploadId,
}) => (
  <div className="text-center space-y-4">
    <div className="relative w-12 h-12 mx-auto">
      <CheckCircle className="absolute inset-0 m-auto w-7 h-7 text-emerald-600" />
    </div>
    <div>
      <h3 className="text-xl font-poppins font-semibold text-h1 mb-2">
        Upload Complete!
      </h3>
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 max-w-md mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-action-button-gradient rounded-xl flex items-center justify-center flex-shrink-0">
            <FileSpreadsheet className="w-6 h-6 text-white" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <p className="font-semibold text-slate-800 truncate">
              {uploadedFile.name}
            </p>
            <p className="text-sm text-slate-500">
              {formatFileSize(uploadedFile.size)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-8">
        <button
          onClick={removeFile}
          className="px-6 py-3 bg-slate-200 text-h1 rounded-xl font-medium transition-all duration-200"
        >
          Remove File
        </button>
        <button
          onClick={handleProcessing}
          className="px-8 py-3 bg-action-button-gradient hover:from-emerald-700 hover:to-t2 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
        >
          {uploadId ? 'Processing' : 'Start Process'}
        </button>
      </div>
    </div>
  </div>
);

const UploadProgressView = ({ progress, handleCancel }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 max-w-md w-full">
    <div className="text-center mb-8">
      <div
        className={`inline-flex items-center justify-center w-7 h-7 rounded-2xl mb-4 transition-all duration-500 ${
          progress === 100
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-purple-500/20 text-purple-400'
        }`}
      >
        {progress === 100 ? (
          <CheckCircle className="w-4 h-4 animate-pulse" />
        ) : (
          <Upload
            className={`w-4 h-4 ${progress > 0 ? 'animate-bounce' : ''}`}
          />
        )}
      </div>
      <h2 className="text-lg font-bold text-white mb-2">
        {progress === 100 ? 'Upload Complete!' : 'Processing Upload'}
      </h2>
      <p className="text-white/70">
        {progress === 100
          ? 'Your file has been successfully processed'
          : 'Please wait while we process your file'}
      </p>
    </div>

    <div className="space-y-6">
      <div className="relative">
        <div className="w-full h-6 bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
          <div
            className={`h-full transition-all duration-500 ease-out relative ${
              progress === 100
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                : 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500'
            }`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            {!progress === 100 && progress > 0 && (
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-r from-transparent to-white/40 animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <div
          className={`text-3xl font-bold mb-2 transition-all duration-300 ${
            progress === 100 ? 'text-emerald-400 animate-pulse' : 'text-white'
          }`}
        >
          {progress}%
        </div>
        <div className="text-white/70 font-medium">
          {progress === 100 ? 'Processing Complete' : 'Processing...'}
        </div>

        {!progress === 100 && progress > 0 && (
          <div className="flex items-center justify-center mt-2 text-sm text-white/60">
            <Zap className="w-4 h-4 mr-1 text-yellow-400" />
            High Speed Mode
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-3 pt-4">
        <button
          onClick={handleCancel}
          className={`group relative w-full px-6 py-4 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95 overflow-hidden ${
            progress === 100
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <div className="relative flex items-center justify-center">
            {progress === 100 ? (
              <>
                <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Upload Again
              </>
            ) : (
              <>
                <X className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Cancel Upload
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  </div>
);

const InitialView = ({ handleUploadClick, link }) => (
  <div className="text-center space-y-8">
    <div className="w-16 h-16 mx-auto">
      <FileSpreadsheet className="m-auto w-14 h-14 text-h1" />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-white mb-4">
        Drop your Excel file here
      </h3>
      <p className="text-white text-base mb-4">
        or click to browse from your device
      </p>

      <button
        onClick={handleUploadClick}
        className="group inline-flex items-center gap-3 px-12 py-4 bg-action-button-gradient text-white rounded-2xl font-semibold text-base font-nunito transition-all duration-300"
      >
        <Upload className="w-6 h-6 group-hover:animate-bounce" />
        Choose File
      </button>
      <a
        href={link}
        download
        aria-label="Download sample Excel template"
        className="underline cursor-pointer mb-6 inline-flex items-center text-base border border-dashed p-2 border-black text-blue-600 font-medium hover:underline hover:text-teal-800 transition duration-150 ease-in-out"
      >
        <DownloadIcon size={16} className="mr-1" />
        Download Sample Template
      </a>
    </div>
  </div>
);

export default memo(ExcelDragDrop);
