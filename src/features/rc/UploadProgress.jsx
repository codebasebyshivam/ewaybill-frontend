// UploadProgress.jsx
import { useEffect } from 'react';
import socket from '../../utils/socket.conn';

function UploadProgress({ uploadId, onComplete }) {
  useEffect(() => {
    if (!uploadId) return;

    // Join upload room
    socket.emit('join-room', uploadId);

    // Listen for progress updates
    socket.on('upload-progress', (data) => {
      console.log('Progress:', data);
      // You can update progress bar state here
    });

    // Listen for job completion
    socket.on('upload-complete', (data) => {
      console.log('✅ Upload complete:', data);
      onComplete?.(data);
    });

    // Cleanup
    return () => {
      socket.off('upload-progress');
      socket.off('upload-complete');
    };
  }, [uploadId]);

  return null; // You can render a UI progress bar with state updates here
}

export default UploadProgress;
