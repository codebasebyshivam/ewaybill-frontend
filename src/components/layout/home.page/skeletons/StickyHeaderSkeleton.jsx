import React from 'react';

const StickyHeaderSkeleton = () => {
  return (
    <>
      {/* Spacer to prevent layout shift when sticky is applied */}
      <div style={{ height: '88px' }}></div>
      <header
        className="z-30 flex justify-between items-center px-8 py-6 border-b fixed top-0 left-0 w-full shadow-lg bg-white/90 backdrop-blur-md border-teal-100 animate-pulse"
      >
        {/* Logo & Branding Skeleton */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="hidden sm:flex w-12 h-12 skeleton rounded-xl items-center justify-center shadow-lg" />
          </div>
          <div>
            <div className="h-7 w-24 sm:w-24 lg:w-40 skeleton rounded mb-2" />
            <div className="h-4 w-40 skeleton rounded hidden sm:block" />
          </div>
        </div>
        {/* Call to Action Skeleton */}
        <div>
          <div className="h-10 w-28 skeleton rounded-full" />
        </div>
      </header>
    </>
  );
};

export default StickyHeaderSkeleton; 