import { useCallback, memo, lazy, Suspense } from 'react';

const FileUpload = lazy(() => import('../../components/common/FileUpload'));



const BulkUpload = ({ heading, link }) => {
  const handleUpload = useCallback((files) => {
    console.log('Files uploaded:', files);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* ✅ Background image optimized for LCP */}
      <img
        src="/assets/excel_uploader.webp"
        alt="Excel uploader background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10"
        loading="lazy"
      />

      {/* Foreground content */}
      <div className="relative flex flex-col items-center justify-start p-8 z-10">
        <h1 className="text-6xl md:leading-normal font-poppins font-semibold bg-black bg-clip-text text-transparent mb-6">
          {heading}
        </h1>
        <Suspense fallback={<div>Loading FileUpload ...</div>}>
          <FileUpload onUpload={handleUpload} link={link} />
        </Suspense>
      </div>
    </div>
  );
}


export default memo(BulkUpload);