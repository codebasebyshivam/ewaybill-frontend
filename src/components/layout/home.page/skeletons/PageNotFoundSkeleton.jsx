import React from 'react';

const PageNotFoundSkeleton = () => (
  <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
    {/* Background gradient container */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),rgba(59,130,246,0))]" />
    </div>

    {/* Floating elements (skeleton blocks) */}
    <div className="absolute top-20 left-16 w-12 h-12 bg-blue-200 opacity-20 animate-pulse rounded-lg" />
    <div className="absolute top-32 right-20 w-8 h-8 bg-blue-100 opacity-20 animate-pulse rounded-lg" />
    <div className="absolute bottom-32 left-32 w-6 h-6 bg-blue-100 opacity-20 animate-pulse rounded-lg" />

    {/* Geometric shapes (skeleton blocks) */}
    <div className="absolute top-16 right-16 w-3 h-3 bg-blue-200 opacity-30 animate-pulse rounded-full" />
    <div className="absolute bottom-16 right-32 w-2 h-2 bg-gray-200 opacity-30 animate-pulse" />
    <div className="absolute top-1/3 left-8 w-4 h-4 bg-blue-100 opacity-30 animate-pulse rounded-full" />

    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      {/* 404 box skeleton */}
      <div className="mb-12 relative inline-block">
        <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-xl transform rotate-3">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl opacity-10"></div>
          <div className="skeleton h-20 w-40 mx-auto mb-2 rounded" />{' '}
          {/* 404 number skeleton */}
          <div className="absolute inset-0 skeleton h-full w-full rounded-2xl opacity-20" />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-200 rounded transform rotate-45"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gray-200 rounded-full"></div>
        </div>
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg transform rotate-12 animate-pulse opacity-80"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-2 border-gray-200 rounded transform rotate-45 animate-pulse"></div>
      </div>
      {/* Content skeletons */}
      <div className="space-y-6 mb-12">
        <div className="skeleton h-10 w-80 mx-auto rounded mb-2" />{' '}
        {/* Title skeleton */}
        <div className="skeleton h-6 w-96 mx-auto rounded" />{' '}
        {/* Subtitle skeleton */}
      </div>
      {/* Button skeletons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="skeleton h-12 w-44 rounded-lg" />
        <div className="skeleton h-12 w-36 rounded-lg" />
        <div className="skeleton h-12 w-36 rounded-lg" />
      </div>
      <div className="mt-16 skeleton h-5 w-48 mx-auto rounded" />{' '}
      {/* Footer skeleton */}
    </div>

    {/* Grid overlay skeleton */}
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

export default PageNotFoundSkeleton;
