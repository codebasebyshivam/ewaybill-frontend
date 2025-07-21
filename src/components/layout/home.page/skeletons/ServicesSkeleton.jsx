import React from 'react';

const ServicesSkeleton = () => (
  <section>
    <div className="text-center mb-12">
      <div className="skeleton h-8 w-64 mx-auto mb-4" />
      <div className="skeleton h-5 w-80 mx-auto" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {[1,2,3,4].map((i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 flex flex-col gap-4">
          <div className="flex items-start space-x-6 mb-4">
            <div className="skeleton w-12 h-12 rounded-2xl" />
            <div className="flex-1">
              <div className="skeleton h-6 w-32 mb-2" />
              <div className="skeleton h-4 w-40 mb-4" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[1,2,3,4].map((j) => (
                  <div key={j} className="flex flex-col items-center">
                    <div className="skeleton h-5 w-12 mb-1" />
                    <div className="skeleton h-3 w-10" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[1,2,3,4].map((j) => (
                  <div key={j} className="flex items-center space-x-3">
                    <div className="skeleton w-2 h-2 rounded-full" />
                    <div className="skeleton h-3 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServicesSkeleton; 