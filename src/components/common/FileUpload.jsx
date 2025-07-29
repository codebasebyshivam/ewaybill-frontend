import { useState, useRef, useEffect } from 'react';
import { Upload, FileSpreadsheet, CheckCircle } from 'lucide-react';
import DeleteModal from './DeleteModal';
import { DownloadIcon } from 'lucide-react';


const ExcelDragDrop = ({ link }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef(null);

    const supportedFormats = ['.xlsx', '.xls', '.csv'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

    const isValidExcelFile = (file) => {
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        return supportedFormats.includes(fileExtension);
    };

    const isValidFileSize = (file) => {
        return file.size <= maxFileSize;
    };

    const handleFile = (file) => {
        setError('');
        setIsProcessing(true);

        // Simulate processing delay for better UX
        setTimeout(() => {
            if (!isValidExcelFile(file)) {
                setError('Only Excel files (.xlsx, .xls, .csv) are supported.');
                setShowModal(true);
                setIsProcessing(false);
                return;
            }

            if (!isValidFileSize(file)) {
                setError('File size must be less than 5MB.');
                setShowModal(true);
                setIsProcessing(false);
                return;
            }

            setUploadedFile(file);
            setIsProcessing(false);
            setShowModal(false);
        }, 800);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        if (e.clientX === 0 && e.clientY === 0) {
            setIsDragOver(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    useEffect(() => {
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

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const removeFile = () => {
        setUploadedFile(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            {/* Modern drag overlay */}
            {isDragOver && (
                <>
                    <div className="fixed inset-0 bg-t1/70 z-50 flex items-center justify-center backdrop-blur-sm">
                        {/* Top-left corner */}
                        <div className="absolute top-8 left-8 w-10 h-10 border-t-8 border-l-8 border-white rounded-tl-2xl"></div>

                        {/* Top-right corner */}
                        <div className="absolute top-8 right-8 w-10 h-10 border-t-8 border-r-8 border-white rounded-tr-2xl"></div>

                        {/* Bottom-left corner */}
                        <div className="absolute bottom-8 left-8 w-10 h-10 border-b-8 border-l-8 border-white rounded-bl-2xl"></div>

                        {/* Bottom-right corner */}
                        <div className="absolute bottom-8 right-8 w-10 h-10 border-b-8 border-r-8 border-white rounded-br-2xl"></div>

                        {/* Content Centered */}
                        <div className="flex items-center justify-center h-full">
                            <h1 className="text-4xl font-bold text-white">Drop  Anywhere</h1>
                        </div>
                        {/* <div className="text-center text-white  w-3/4 h-3/4 ">
                            <div className="w-32 h-32 mx-auto mb-8 relative">
                                <div className="relative w-full h-full bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Cloud className="w-16 h-16" />
                                </div>
                            </div>
                                <h2 className="text-4xl font-bold mb-4">Drop your Excel file</h2>
                                <p className="text-xl opacity-90">Release to upload instantly</p>
                        </div> */}
                    </div>
                </>
            )}


            <div className="max-w-3xl">
                {/* Main upload card with glassmorphism */}
                <div className={`border-2 border-dashed border-gray-400 rounded-3xl p-8  ${uploadedFile
                    ? 'bg-white border-emerald-200/50 shadow-2xl shadow-emerald-500/20'
                    : isProcessing
                        ? 'bg-white border-blue-200/50 shadow-2xl shadow-blue-500/20'
                        : 'bg-black'
                    } ${isDragOver ? 'scale-105 shadow-3xl' : ''}`}>

                    {isProcessing ? (
                        <div className="text-center space-y-8">
                            <div className="relative w-16 h-16 mx-auto">
                                <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                <FileSpreadsheet className="absolute inset-0 m-auto w-7 h-7 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-4 font-poppins">Processing your file...</h3>
                                <p className="text-slate-600 text-base font-nunito">This will just take a moment</p>
                            </div>
                        </div>
                    ) : uploadedFile ? (
                        <div className="text-center space-y-4">
                            <div className="relative w-12 h-12 mx-auto">
                                <CheckCircle className="absolute inset-0 m-auto w-7 h-7 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-poppins font-semibold  text-h1 mb-2">Upload Complete!</h3>
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 max-w-md mx-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-action-button-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                                            <FileSpreadsheet className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-left min-w-0 flex-1">
                                            <p className="font-semibold text-slate-800 truncate">{uploadedFile.name}</p>
                                            <p className="text-sm text-slate-500">{formatFileSize(uploadedFile.size)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-center mt-8">
                                    <button
                                        onClick={removeFile}
                                        className="px-6 py-3 bg-slate-200  text-h1 rounded-xl font-medium transition-all duration-200"
                                    >
                                        Remove File
                                    </button>
                                    <button className="px-8 py-3 bg-action-button-gradient hover:from-emerald-700 hover:to-t2 text-white rounded-xl font-medium transition-all duration-200  shadow-lg shadow-emerald-500/25">
                                        Process File
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-8">
                            <div className="w-16 h-16 mx-auto">
                                <FileSpreadsheet className=" m-auto w-14 h-14 text-h1" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Drop your Excel file here
                                </h3>
                                <p className="text-white text-base mb-4">or click to browse from your device</p>

                                <button
                                    onClick={handleUploadClick}
                                    className="group inline-flex items-center gap-3 px-12 py-4 bg-action-button-gradient  text-white rounded-2xl font-semibold text-base font-nunito transition-all duration-300"
                                >
                                    <Upload className="w-6 h-6 group-hover:animate-bounce" />
                                    Choose  File
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
            {/* {showModal && error && ( */}
            <DeleteModal
                isOpen={showModal && error}
                onClose={() => setShowModal(false)}
                onConfirm={handleUploadClick}
                title="Upload Error"
                message={
                    <div className="">
                        <h4 className="font-semibold text-slate-700 mb-2">Requirements:</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Supported formats: .xlsx, .xls, .csv</li>
                            <li>• Maximum file size: 5MB</li>
                            <li>• File must not be corrupted</li>
                        </ul>
                    </div>
                }
                confirmButtonText="Try Again"
                cancelButtonText="Cancel"

            />

            {/* )} */}
        </>
    );
};

export default ExcelDragDrop;