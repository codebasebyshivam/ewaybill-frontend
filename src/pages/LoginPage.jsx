import {
  memo,
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from 'react';
import {
  Zap,
  CreditCard,
  Truck,
  Building,
  UserPlus,
  LogIn,
  CheckCircle,
  AlertCircle,
  ArrowLeftCircleIcon,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import kats_logo from '../assets/kats_logo.svg';
const Register = lazy(
  () => import('../components/layout/login.page/RegisterForm')
);
const Login = lazy(() => import('../components/layout/login.page/LoginForm'));
const LoginFormSkeleton = lazy(
  () => import('../components/layout/login.page/skeleton/LoginFormSkeleton')
);
const RegisterFormSkeleton = lazy(
  () => import('../components/layout/login.page/skeleton/RegisterFormSkeleton')
);

// Memoized Feature Card component
const FeatureCard = memo(({ feature, isActive }) => {
  const Icon = feature.icon;
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 transform ${
        isActive ? 'scale-105 bg-white/20 shadow-lg' : 'hover:bg-white/15'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isActive ? 'bg-white/30 scale-110' : ''
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-green-100 text-sm mt-1">{feature.desc}</p>
        </div>
      </div>
    </div>
  );
});

const features = [
  {
    icon: CreditCard,
    title: 'EwayBill',
    desc: 'Digital transport documents',
    color: 'from-blue-500 to-blue-600',
    stats: '50K+ users',
  },
  {
    icon: Zap,
    title: 'FASTag',
    desc: 'Seamless toll payments',
    color: 'from-yellow-500 to-yellow-600',
    stats: '1M+ transactions',
  },
  {
    icon: Truck,
    title: 'RC',
    desc: 'Vehicle registration',
    color: 'from-purple-500 to-purple-600',
    stats: '25K+ vehicles',
  },
  {
    icon: Building,
    title: 'Challan',
    desc: 'Traffic violation management',
    color: 'from-red-500 to-red-600',
    stats: '10K+ resolved',
  },
];

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState(null);
  const [typingAnimation, setTypingAnimation] = useState('');
  const [currentFeature, setCurrentFeature] = useState(0);

  const navigate = useNavigate();

  // Memoized handler to prevent new function creation every render
  const handleSetLogin = useCallback(() => setIsLogin(true), []);
  const handleSetRegister = useCallback(() => setIsLogin(false), []);

  // Cycle features every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for welcome text
  useEffect(() => {
    const text = isLogin ? 'Welcome Back' : 'Create Account';
    let index = 0;

    const interval = setInterval(() => {
      setTypingAnimation(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLogin]);

  // Memoize the feature indicators so they don't re-render unnecessarily
  const featureIndicators = useMemo(() => {
    return features.map((_, index) => (
      <div
        key={index}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          index === currentFeature ? 'bg-white w-6' : 'bg-white/40'
        }`}
      />
    ));
  }, [currentFeature]);

  const handleBackButton = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          } transform transition-all duration-300`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-2 h-[100dvh]">
        {/* Left Side - Login/Register Form */}
        <div className=" mx-auto w-full sm:w-3/4 lg:w-full  xl:w-3/4 p-4 lg:p-6 transform  transition-transform duration-300  flex item-center justify-start  flex-col">
          <button
            className="md:hidden bg-action-button-gradient text-white font-nunito rounded-full p-3 self-start mb-8"
            onClick={handleBackButton}
          >
            <ArrowLeft />
          </button>

          {/* Logo */}
          <div className="mb-8 md:mb-4">
            <div className="flex items-center justify-between space-x-3">
              <div>
                <h1 className="text-2xl font-poppins font-bold text-gray-800 mb-2">
                  {typingAnimation}
                  <span className="animate-pulse text-md font-normal">|</span>
                </h1>
                <p className="text-gray-600 font-nunito">
                  {isLogin
                    ? 'Sign in to access your dashboard'
                    : 'Join us to get started with our services'}
                </p>
              </div>
              <div className="w-12 h-12 bg-action-button-gradient rounded-xl flex items-center justify-center">
                <img
                  src={kats_logo}
                  loading="lazy"
                  className="w-7 h-7"
                  alt="kats_logo"
                />
              </div>
            </div>
          </div>

          {/* Form Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8  md:mb-5">
            <button
              aria-label="Login Tab"
              onClick={handleSetLogin}
              className={`font-nunito flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                isLogin
                  ? 'bg-action-button-gradient text-white shadow-sm'
                  : 'text-gray-800 hover:text-gray-900'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button
              aria-label="Register Tab"
              onClick={handleSetRegister}
              className={`font-nunito flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                !isLogin
                  ? 'bg-action-button-gradient text-white shadow-sm'
                  : 'text-gray-800 hover:text-gray-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </button>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <Suspense fallback={<LoginFormSkeleton />}>
              <Login />
            </Suspense>
          ) : (
            <Suspense fallback={<RegisterFormSkeleton />}>
              <Register />
            </Suspense>
          )}
        </div>

        {/* Right Section - Features */}
        <div className="hidden lg:block bg-action-button-gradient  p-8 md:p-12 text-white shadow-md relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24 translate-y-24"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-green-100 mb-8 text-lg">
              DL, RC, FASTag, Challan, EwayBill - Just One Click Away
            </p>

            {/* Animated Feature Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  isActive={index === currentFeature}
                />
              ))}
            </div>

            {/* Feature Indicators */}
            <div className="flex justify-center space-x-2 mb-8">
              {featureIndicators}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
