import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Building,
  UserPlus,
  Mail,
  Phone,
} from 'lucide-react';


const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// Yup validation schema
const schema = yup
  .object({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup
      .string()
      .matches(/^\d{10}$/, 'Phone must be 10 digits')
      .required('Phone is required'),
    company: yup.string().required('company is required'),
    gstin: yup
      .string()
      .required('GSTIN is required')
      .matches(gstinRegex, 'Invalid GSTIN format'),
    password: yup
      .string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    terms: yup.boolean().oneOf([true], 'You must accept the terms'),
  })
  .required();

export default function RegisterForm({ setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange', // validate on change
    resolver: yupResolver(schema),
  });

  const handleLoginPage = useCallback(() => {
    setIsLogin(true);
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Registration successful! Please login.');

      reset(); // Clear form
      // Here you can switch to login or redirect
    }, 2000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-5 animate-fadeIn"
        noValidate
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* <div className="relative group">
          <label
            htmlFor="fullName"
            className="font-nunito block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
            <input
              id="fullName"
              type="text"
              placeholder="Enter full name"
              {...register('fullName')}
              className={`outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
                focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                ${errors.fullName ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
              aria-invalid={errors.fullName ? 'true' : 'false'}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-600 mt-1 text-sm">{errors.fullName.message}</p>
          )}
        </div> */}

          <div className="relative group col-span-2">
            {/* <label
              htmlFor="email"
              className="font-nunito hidden md:block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label> */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register('email')}
                className={`outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
                focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                ${errors.email ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>


        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative group">
            {/* <label
              htmlFor="phone"
              className="font-nunito hidden md:block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label> */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                id="phone"
                type="tel"
                maxLength={10}
                placeholder="Enter phone"
                {...register('phone')}
                className={`outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
                focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                ${errors.phone ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 mt-1 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="relative group">
            {/* <label
              htmlFor="company"
              className="font-nunito hidden md:block text-sm font-medium text-gray-700 mb-2"
            >
              Company
            </label> */}
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                id="company"
                type="text"
                placeholder="Enter company name"
                {...register('company')}
                className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                aria-invalid="false"
              />
            </div>
            {errors.company && (
            <p className="text-red-600 mt-1 text-sm">{errors.company.message}</p>
          )}
          </div>
        </div>

    

        <div className="grid md:grid-cols-2 gap-4">
        <div className="relative group col-span-2">
          {/* <label
            htmlFor="gstin"
            className="font-nunito hidden md:block text-sm font-medium text-gray-700 mb-2"
          >
            Gstin
          </label> */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
            <input
              id="gstin"
              type="text"
              placeholder="Enter GST number"
              {...register('gstin')}
              className={`outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent
              ${errors.gstin ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
              aria-invalid={errors.gstin ? 'true' : 'false'}
            />
          </div>
          {errors.gstin && (
            <p className="text-red-600 mt-1 text-sm">{errors.gstin.message}</p>
          )}
        </div>


          <div className="relative group col-span-2">
            {/* <label
              htmlFor="password"
              className="font-nunito hidden md:block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label> */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create password"
                {...register('password')}
                className={`outline-none w-full pl-10 pr-12 py-3 border rounded-xl transition-all duration-200
                focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                ${errors.password ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <button
                aria-label={`${showPassword ? 'Hide Password' : 'Show Password'}`}
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
              <p className="text-red-600 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* 
        <div className="relative group">
          <label
            htmlFor="confirmPassword"
            className="font-nunito block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              {...register('confirmPassword')}
              className={`outline-none w-full pl-10 pr-12 py-3 border rounded-xl transition-all duration-200
                focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                ${errors.confirmPassword ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            <button
              aria-label={`${showConfirmPassword ? 'Hide Password' : 'Show Password'}`}
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-7 h-7 p-1" />
              ) : (
                <Eye className="w-7 h-7 p-1 text-t2" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 mt-1 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div> */}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            {...register('terms')}
            className="w-4 h-4 border-gray-300 rounded accent-t1 hover:accent-t2"
            aria-invalid={errors.terms ? 'true' : 'false'}
          />
          <label
            htmlFor="terms"
            className="font-nunito ml-2 text-sm text-gray-600 select-none"
          >
            I agree to the{' '}
            <a href="#" className="text-t1 hover:text-t2 cursor-pointer">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-t1 hover:text-t2 cursor-pointer">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms &&  <p className="text-red-600 mt-1 text-sm">{errors.terms.message}</p>}

        <button
          type="submit"
          aria-label="Register Account"
          disabled={isLoading }
          className="font-nunito w-full bg-action-button-gradient text-white py-3 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </form>
      <p className='text-center text-gray-600 text-sm my-3 md:hidden'>OR</p>
      <p className='text-center font-normal font-poppins text-sm text-t1 md:hidden '>Already have an account ? <span className='text-blue-500 text-xs' onClick={handleLoginPage} >Login</span></p>
    </>
  );
}
