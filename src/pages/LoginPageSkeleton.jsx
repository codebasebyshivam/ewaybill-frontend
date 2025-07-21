import React from 'react';
const LoginFormSkeleton = React.lazy(() => import('../components/layout/login.page/LoginFormSkeleton'));
const RegisterFormSkeleton = React.lazy(() => import('../components/layout/login.page/RegisterFormSkeleton'));

const features = [1, 2, 3, 4];

const FeatureCardSkeleton = ({ isActive }) => (
  <div
    className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 transform ${isActive ? 'scale-105 bg-white/20 shadow-lg' : 'hover:bg-white/15'}`}
  >
    <div className="flex flex-col items-center text-center space-y-3">
      <div className={`w-12 h-12 skeleton rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
      <div>
        <div className="skeleton h-5 w-24 mb-2 mx-auto" />
        <div className="skeleton h-3 w-32 mx-auto" />
      </div>
    </div>
  </div>
);

const FeatureIndicatorsSkeleton = () => (
  <div className="flex justify-center space-x-2 mb-8">
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className={`w-2 h-2 rounded-full bg-white/40 skeleton ${i === 0 ? 'w-6 bg-white' : ''}`} />
    ))}
  </div>
);


const LoginPageSkeleton = ({ isLogin = true }) => (
  <div className="min-h-[100dvh] bg-white">
    <div className="grid lg:grid-cols-2 h-[100dvh]">
      {/* Left Side - Login/Register Form Skeleton */}
      <div className="mx-auto w-full sm:w-3/4 lg:w-full xl:w-3/4 p-4 lg:p-6 flex item-center justify-center flex-col">
        {/* Logo Skeleton */}
        <div className="mb-4">
          <div className="flex items-center justify-between space-x-3">
            <div>
              <div className="skeleton h-8 w-40 mb-2" />
              <div className="skeleton h-4 w-56" />
            </div>
            <div className="w-12 h-12 skeleton rounded-xl flex items-center justify-center" />
          </div>
        </div>
        {/* Form Toggle Skeleton */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
          <div className="skeleton h-10 w-1/2 rounded-lg mx-1" />
          <div className="skeleton h-10 w-1/2 rounded-lg mx-1" />
        </div>
        {/* Form Skeleton */}
        <React.Suspense fallback={<div className="skeleton h-96 w-full rounded-xl" />}>
          {isLogin ? <LoginFormSkeleton /> : <RegisterFormSkeleton />}
        </React.Suspense>
      </div>
      {/* Right Section - Features Skeleton */}
      <div className="hidden lg:block bg-action-button-gradient p-8 md:p-12 text-white shadow-md relative overflow-hidden">
        {/* Background Pattern Skeleton */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 skeleton bg-white rounded-full transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 skeleton bg-white rounded-full transform -translate-x-24 translate-y-24" />
        </div>
        <div className="relative z-10">
          <div className="skeleton h-8 w-64 mb-4" />
          <div className="skeleton h-5 w-80 mb-8" />
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((_, i) => (
              <FeatureCardSkeleton key={i} isActive={i === 0} />
            ))}
          </div>
          <FeatureIndicatorsSkeleton />
        </div>
      </div>
    </div>
  </div>
);

export default LoginPageSkeleton; 