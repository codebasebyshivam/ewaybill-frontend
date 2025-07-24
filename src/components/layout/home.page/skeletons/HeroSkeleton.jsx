import React from 'react';

const HeroSkeleton = () => (
  <section className="text-center mb-20">
    <div className="skeleton h-12 w-2/3 max-w-xl mx-auto mb-6" />
    <div className="skeleton h-10 w-1/2 max-w-lg mx-auto mb-8" />
    <div className="skeleton h-6 w-full max-w-2xl mx-auto mb-12" />
    <div className="flex justify-center items-center space-x-6">
      <div className="skeleton h-12 w-40 rounded-full" />
    </div>
  </section>
);

export default HeroSkeleton;
