import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  DollarSign,
  Building,
  LogIn,
} from 'lucide-react';

const companies = [
  { id: 1, name: 'Company A' },
  { id: 2, name: 'Company B' },
  { id: 3, name: 'Company C' },
];

const financialYears = ['2023-2024', '2024-2025', '2025-2026'];

const schema = yup
  .object({
    company: yup.string().required('Company is required'),
    financialYear: yup.string().required('Financial year is required'),
    username: yup.string().required('Username is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  .required();

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert(`Welcome back, ${data.username}!`);
      // You can replace alert with your login logic here
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 animate-fadeIn"
      noValidate
    >
      {/* Company */}
      <div className="relative group">
        <label
          htmlFor="company"
          className="hidden md:block text-sm font-medium text-gray-700 mb-2 font-nunito"
        >
          Select Company
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
          <select
            id="company"
            {...register('company')}
            className={`outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent
              ${errors.company ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
            aria-invalid={errors.company ? 'true' : 'false'}
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        {errors.company && (
          <p className="text-red-600 mt-1 text-sm">{errors.company.message}</p>
        )}
      </div>

      {/* Financial Year */}
      <div className="relative group">
        <label
          htmlFor="financialYear"
          className="hidden md:block text-sm font-medium text-gray-700 mb-2 font-nunito"
        >
          Select Financial Year
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
          <select
            id="financialYear"
            {...register('financialYear')}
            className={`outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent
              ${errors.financialYear ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
            aria-invalid={errors.financialYear ? 'true' : 'false'}
          >
            <option value="">Select financial year</option>
            {financialYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {errors.financialYear && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.financialYear.message}
          </p>
        )}
      </div>

      {/* Username */}
      <div className="relative group">
        <label
          htmlFor="username"
          className="hidden md:block text-sm font-medium text-gray-700 mb-2 font-nunito"
        >
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register('username')}
            className={`outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent
              ${errors.username ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
            aria-invalid={errors.username ? 'true' : 'false'}
          />
        </div>
        {errors.username && (
          <p className="text-red-600 mt-1 text-sm">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative group">
        <label
          htmlFor="password"
          className="hidden md:block text-sm font-medium text-gray-700 mb-2 font-nunito"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password')}
            className={`outline-none w-full pl-10 pr-12 py-3 border rounded-xl transition-all duration-200
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent
              ${errors.password ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          <button
            aria-label={showPassword ? 'Hide Password' : 'Show Password'}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-7 h-7 p-1" />
            ) : (
              <Eye className="w-7 h-7 p-1 text-t2" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Remember me and forgot password */}
      <div className="flex items-center justify-between">
        <label htmlFor="remember" className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 accent-t1 text-t1 hover:accent-t1 border-gray-300 rounded"
          />
          <span className="font-nunito ml-2 text-sm text-gray-600">
            Remember me
          </span>
        </label>
        <a
          href="#"
          className="font-nunito text-sm text-teal-800 hover:text-t1 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        aria-label="Login"
        disabled={isLoading || !isValid}
        className="font-nunito w-full bg-action-button-gradient text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </>
        )}
      </button>
    </form>
  );
}
