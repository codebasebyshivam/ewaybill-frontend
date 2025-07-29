// Optimized NotFoundPage.js with comments for changes
import React from 'react';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ✅ Replaced individual buttons with reusable ActionButton component
const ActionButton = ({ icon: Icon, label, variant = 'primary',handleClick }) => {
  const baseStyle =
    variant === 'primary'
      ? 'bg-t1 hover:bg-t2 text-white'
      : 'bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700';

  return (
    <button
      onClick={handleClick} className={`group font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${baseStyle}`}
    >
      <div className="flex items-center justify-center space-x-2">
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </div>
    </button>
  );
};

// ✅ Optimized by combining wrapper + animated element and added delay inline
const FloatingCube = ({ delay = 0, size = 'w-16 h-16', position = '' }) => (
  <div
    className={`absolute ${position} ${size} opacity-20 animate-pulse`}
    style={{ animationDelay: `${delay}s`, animationDuration: '3s' }}
  >
    <div className="w-full h-full bg-action-button-gradient transform rotate-45" />
  </div>
);

// ✅ Simplified shape condition directly inside className
const GeometricShape = ({
  type = 'circle',
  position,
  color = 'bg-t1',
  size = 'w-2 h-2',
}) => (
  <div
    className={`absolute ${position} ${size} ${color} opacity-30 animate-pulse ${type === 'circle' ? 'rounded-full' : ''}`}
    style={{ animationDuration: '2s' }}
  />
);

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleBackClick = ()=>{
    navigate(-1);
  }
  const handleHomeClick = () => {
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* ✅ Background gradient container retained */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),rgba(59,130,246,0))]" />
      </div>

      {/* ✅ Floating elements kept, delay used inline */}
      <FloatingCube delay={0} size="w-12 h-12" position="top-20 left-16" />
      <FloatingCube delay={1} size="w-8 h-8" position="top-32 right-20" />
      <FloatingCube delay={2} size="w-6 h-6" position="bottom-32 left-32" />

      <GeometricShape
        type="circle"
        position="top-16 right-16"
        color="bg-t2"
        size="w-3 h-3"
      />
      <GeometricShape
        type="square"
        position="bottom-16 right-32"
        color="bg-gray-400"
        size="w-2 h-2"
      />
      <GeometricShape
        type="circle"
        position="top-1/3 left-8"
        color="bg-t2"
        size="w-4 h-4"
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* ✅ Flattened wrapper structure for 404 box */}
        <div className="mb-12 relative inline-block">
          <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-10"></div>
            <h1 className="text-7xl md:text-8xl font-black text-gray-900 relative">
              404
              <div className="absolute inset-0 text-blue-500 transform translate-x-1 translate-y-1 -z-10 opacity-20">
                404
              </div>
            </h1>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-t1 rounded transform rotate-45"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>

          <div className="absolute -top-6 -left-6 w-12 h-12 bg-action-button-gradient rounded-lg transform rotate-12 animate-pulse opacity-80"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-2 border-gray-300 rounded transform rotate-45 animate-pulse"></div>
        </div>

        {/* ✅ Retained and structured content section */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track with our navigation options below.
          </p>
        </div>

        {/* ✅ Replaced with ActionButton component */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ActionButton icon={Home} label="Back to Home" variant="primary" handleClick={handleHomeClick} />
          {/* <ActionButton icon={Search} label="Search" variant="secondary" /> */}
          <ActionButton icon={ArrowLeft} label="Go Back" variant="secondary" handleClick={handleBackClick} />
        </div>

       
      </div>

      {/* ✅ Grid overlay retained */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
}
