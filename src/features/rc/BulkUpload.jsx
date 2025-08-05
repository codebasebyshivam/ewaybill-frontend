import { memo, lazy, Suspense } from 'react';

const FileUpload = lazy(() => import('../../components/common/FileUpload'));

const BulkUpload = ({ link }) => {
  return (
    <div className="relative min-h-screen">
      {/* ✅ Background image optimized for LCP */}
      <img
        src="/assets/excel_uploader.webp"
        alt="Excel uploader background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
        loading="lazy"
      />

      {/* Foreground content */}
      <div className="relative flex flex-col h-full items-center justify-center p-4 z-10">
        <Suspense fallback={<div>Loading FileUpload ...</div>}>
          <FileUpload link={link} />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(BulkUpload);
