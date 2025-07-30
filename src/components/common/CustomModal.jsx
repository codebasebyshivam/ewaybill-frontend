
export default function CustomModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[2000]">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative overflow-hidden transform scale-95 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
