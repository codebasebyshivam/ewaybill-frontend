import FileUpload from '../../components/common/FileUpload';

export default function BulkUpload({ heading, link }) {
  const handleUpload = (files) => {
    console.log('Files uploaded:', files);
  };

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
        <FileUpload onUpload={handleUpload} link={link} />
      </div>
    </div>
  ); 
}
 