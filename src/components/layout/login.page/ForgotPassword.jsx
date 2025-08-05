// components/ForgotPasswordModal.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be exactly 6 digits'),
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default function ForgotPasswordModal({ onSubmitReset }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Reset data:', data);
    onSubmitReset?.(data); // Optional: Call parent handler
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        {/* <label className="block text-gray-700">OTP</label> */}
        <input
          type="text"
          placeholder="Enter OTP"
          {...register('otp')}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.otp && (
          <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
        )}
      </div>

      <div>
        {/* <label className="block text-gray-700">New Password</label> */}
        <input
          type="password"
          placeholder="Enter new password"
          {...register('newPassword')}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-action-button-gradient text-white font-semibold font-nunito py-2 rounded-lg transition duration-200"
      >
        Reset Password
      </button>
    </form>
  );
}
