import { X, AlertTriangle } from 'lucide-react';
import '../../css/responsive.utility.css';

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmButtonText = 'Delete',
  cancelButtonText = 'Cancel',
  itemName = '',
}) => {
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Modal overlay
    <div className="modal-overlay">
      {/* Modal container  */}
      <div className="modal-container">
        {/* Modal header */}
        <div className="modal-header">
          <h3 className="text-lg font-medium text-gray-900  flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="modal-body">
          <div className="text-base text-gray-500 font-nunito">{message}</div>
          {itemName && (
            <div className="mt-2 p-3 bg-gray-100  rounded border border-gray-200">
              <p className="font-medium text-gray-800 break-words">
                {itemName}
              </p>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="modal-footer">
          <button onClick={onConfirm} className="delete-confirm-btn">
            {confirmButtonText}
          </button>
          <button onClick={onClose} className="delete-cancel-btn">
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
