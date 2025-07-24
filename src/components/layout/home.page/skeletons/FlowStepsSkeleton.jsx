import React from 'react';

const FlowStepsSkeleton = () => (
  <section className="hidden md:block mb-20">
    <div className="text-center mb-12">
      <div className="skeleton h-8 w-48 mx-auto mb-4" />
      <div className="flex justify-center items-center space-x-4">
        <div className="skeleton h-8 w-24 rounded-full" />
      </div>
    </div>
    <div className="flex justify-center items-center space-x-8 relative">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col items-center relative">
          <div className="relative w-16 h-16 mb-3">
            <div className="skeleton w-16 h-16 rounded-full" />
          </div>
          <div className="skeleton h-4 w-20 mb-2" />
          {i < 4 && (
            <div
              className="absolute top-8 left-20 w-16 h-1 skeleton"
              style={{ transform: 'translateX(50%)' }}
            ></div>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default FlowStepsSkeleton;
