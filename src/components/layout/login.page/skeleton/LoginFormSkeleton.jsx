import React from 'react';

const LoginFormSkeleton = () => (
  <form className="space-y-5 animate-fadeIn" aria-busy="true">
    {/* Company */}
    <div className="space-y-2">
      <div className="skeleton h-4 w-32 mb-2" />
      <div className="skeleton h-12 w-full rounded-xl" />
    </div>
    {/* Financial Year */}
    <div className="space-y-2">
      <div className="skeleton h-4 w-40 mb-2" />
      <div className="skeleton h-12 w-full rounded-xl" />
    </div>
    {/* Username */}
    <div className="space-y-2">
      <div className="skeleton h-4 w-28 mb-2" />
      <div className="skeleton h-12 w-full rounded-xl" />
    </div>
    {/* Password */}
    <div className="space-y-2">
      <div className="skeleton h-4 w-28 mb-2" />
      <div className="skeleton h-12 w-full rounded-xl" />
    </div>
    {/* Remember me and forgot password */}
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="skeleton w-4 h-4 rounded" />
        <div className="skeleton h-4 w-20" />
      </div>
      <div className="skeleton h-4 w-24" />
    </div>
    {/* Submit */}
    <div className="skeleton h-12 w-full rounded-xl" />
  </form>
);

export default LoginFormSkeleton;
