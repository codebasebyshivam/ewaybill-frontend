import React from 'react';

const RegisterFormSkeleton = () => (
  <form className="w-full space-y-5 animate-fadeIn" aria-busy="true">
    {/* Full Name & Email */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="skeleton h-4 w-32 mb-2" />
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-24 mb-2" />
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>
    </div>
    {/* Phone & Company */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="skeleton h-4 w-20 mb-2" />
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-24 mb-2" />
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>
    </div>
    {/* GSTIN */}
    <div className="space-y-2">
      <div className="skeleton h-4 w-24 mb-2" />
      <div className="skeleton h-12 w-full rounded-xl" />
    </div>
    {/* Password & Confirm Password */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="skeleton h-4 w-24 mb-2" />
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-32 mb-2" />
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>
    </div>
    {/* Terms Checkbox */}
    <div className="flex items-center space-x-2">
      <div className="skeleton w-4 h-4 rounded" />
      <div className="skeleton h-4 w-40" />
    </div>
    {/* Submit */}
    <div className="skeleton h-12 w-full rounded-xl" />
  </form>
);

export default RegisterFormSkeleton;
