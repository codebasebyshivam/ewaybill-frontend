import React, { useEffect, useState } from 'react';

export default function Drio() {
  const [isDragOver, setIsDragOver] = useState(false);
  useEffect(() => {
    const handleGlobalDragOver = (e) => {
      // e.preventDefault();
      console.log('dropover working');
      document.getElementById('dropbox').style.background = '#e0ffe0'; // visual feedback
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
      alert('drop event triggered!'); // 🧨 This won't happen

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        alert('fiile uploaded');
        handleFile(files[0]);
      }
    };

    document
      .getElementById('dropbox')
      .addEventListener('dragover', handleGlobalDragOver);
    document
      .getElementById('dropbox')
      .addEventListener('dragleave', handleGlobalDragLeave);
    document
      .getElementById('dropbox')
      .addEventListener('drop', handleGlobalDrop);

    return () => {
      document
        .getElementById('dropbox')
        .removeEventListener('dragover', handleGlobalDragOver);
      document
        .getElementById('dropbox')
        .removeEventListener('dragleave', handleGlobalDragLeave);
      document
        .getElementById('dropbox')
        .removeEventListener('drop', handleGlobalDrop);
    };
  }, []);

  return (
    <>
      {/* {isDragOver && (<h1>sdfsdsdfds</h1>)} */}
      <div id="dropbox" className="w-20 h-20 bg-red-500">
        dd
      </div>
    </>
  );
}
