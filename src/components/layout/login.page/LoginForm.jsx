import { useState, useCallback, useEffect } from 'react';
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
import { createPortal } from 'react-dom';
import CustomModal from '../../common/CustomModal';
import ForgotPasswordModal from './ForgotPassword';
import api from '../../../api/axios.instance';
import useAuthStore from '../../../store/useAuthStore';
import { useNavigate, useLocation } from 'react-router-dom';

const schema = yup
  .object({
    company: yup.string().required('Company is required'),
    financialYear: yup.string().required('Financial year is required'),
    username: yup.string().required('Username is required'),
    password: yup
      .string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
  })
  .required();

export default function LoginForm({ setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);
  const [rememberMe, setRememberMe] = useState(
    JSON.parse(localStorage.getItem('rememberMe')) || false
  );

  const navigate = useNavigate();
  const location = useLocation(); // access state passed from Navigate

  const from = location.state?.from?.pathname || '/profile'; // fallback if none

  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const selectedCompanyId = watch('company')?.split('_')[0]; // Extract company ID from selected value

  const handleForgotPopup = useCallback(() => {
    setOpenPopup(false);
  }, []);

  const handleForgotOpenPopup = useCallback(() => {
    setOpenPopup(true);
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/api/companies-list', {
          id: register('company').value,
        });
        const companies = response.data?.cmp_list || [];
        setCompanies(companies);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchFinancialYears = async () => {
      if (!selectedCompanyId) return;

      try {
        const response = await api.post('/api/financial-years', {
          id: selectedCompanyId,
        });
        const years = response.data?.financial_years || [];
        // console.log('Financial Years:', years);
        setFinancialYears(years);
      } catch (error) {
        console.error('Failed to fetch financial years:', error);
      }
    };

    fetchFinancialYears();
  }, [selectedCompanyId]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true); // Optional: store flag in localStorage
      const response = await api.post('/api/login', {
        ...data,
        rememberMe,
      });
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      setUser(response.data.user_info);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(`error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterPage = useCallback(() => {
    setIsLogin(false);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 animate-fadeIn"
        noValidate
      >
        {/* Username */}
        <div className="relative group">
          {/* <label
            htmlFor="username"
            className="hidden md:block text-sm font-medium text-gray-700 mb-2 font-nunito"
          >
            Username
          </label> */}
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
            <p className="text-red-600 mt-1 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative group">
          {/* <label
            htmlFor="password"
            className="hidden md:block text-sm font-medium text-gray-700 mb-2 font-nunito"
          >
            Password
          </label> */}
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
            <p className="text-red-600 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Company */}
        <div className="relative group">
          {/* <label
            htmlFor="company"
            className="hidden md:block text-sm font-medium text-gray-700 mb-2 font-nunito"
          >
            Select Company
          </label> */}
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
            <select
              id="company"
              {...register('company')}
              className={`cursor-pointer outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
    focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    text-gray-600 bg-white appearance-none
    ${errors.company ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
              aria-invalid={errors.company ? 'true' : 'false'}
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option
                  key={company.id}
                  value={`${company.id}_${company.Company}`}
                >
                  {company.Company}
                </option>
              ))}
            </select>
          </div>
          {errors.company && (
            <p className="text-red-600 mt-1 text-sm">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Financial Year */}
        <div className="relative group">
          {/* <label
            htmlFor="financialYear"
            className="hidden md:block text-sm font-medium text-gray-700 mb-2 font-nunito"
          >
            Select Financial Year
          </label> */}
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
            <select
              id="financialYear"
              {...register('financialYear')}
              className={`cursor-pointer outline-none w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200
    focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    text-gray-600 bg-white appearance-none
    ${errors.financialYear ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-emerald-300'}`}
              aria-invalid={errors.financialYear ? 'true' : 'false'}
            >
              <option value="">Select financial year</option>
              {financialYears.map((data) => (
                <option key={data.id} value={`${data.dbname}_${data.FY}`}>
                  {data.FY}
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

        {/* Remember me and forgot password */}
        <div className="flex items-center justify-between">
          <label htmlFor="remember" className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
                localStorage.setItem('rememberMe', e.target.checked);
              }}
              className="w-4 h-4 accent-t1 text-t1 hover:accent-t1 border-gray-300 rounded"
            />
            <span className="font-nunito ml-2 text-sm text-gray-600">
              Remember me
            </span>
          </label>
          <span
            onClick={handleForgotOpenPopup}
            className="font-nunito text-sm text-teal-800 hover:text-t1 transition-colors cursor-pointer"
          >
            Forgot password?
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          aria-label="Login"
          disabled={isLoading}
          className="font-nunito w-full bg-action-button-gradient text-white py-3 rounded-xl font-semibold text-base  shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
      <p className="text-center text-gray-600 text-sm my-3 md:hidden">OR</p>
      <p className="text-center font-normal font-poppins text-sm text-t1 md:hidden ">
        Want to register ?{' '}
        <span className="text-blue-500 text-xs" onClick={handleRegisterPage}>
          Create Free Account
        </span>
      </p>

      {createPortal(
        <CustomModal
          isOpen={openPopup}
          onClose={handleForgotPopup}
          title="Reset Password"
          size="sm"
        >
          <ForgotPasswordModal />
        </CustomModal>,
        document.body
      )}
    </>
  );
}
