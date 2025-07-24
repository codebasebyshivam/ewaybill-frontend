import React from 'react';

const StatsSkeleton = () => (
  <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="skeleton w-10 h-10 rounded-2xl" />
          <div className="text-right flex flex-col gap-1">
            <div className="skeleton h-3 w-10 mb-1" />
            <div className="skeleton h-3 w-14" />
          </div>
        </div>
        <div className="skeleton h-8 w-20 mb-1 mx-auto" />
        <div className="skeleton h-4 w-16 mx-auto" />
      </div>
    ))}
  </section>
);

export default StatsSkeleton;
