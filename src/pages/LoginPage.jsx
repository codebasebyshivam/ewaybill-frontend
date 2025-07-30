import {
  memo,
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
} from 'react';
import {
  UserPlus,
  LogIn,
} from 'lucide-react';
import FeaturesList from '../components/layout/login.page/FeaturesList';
import kats_logo from '../assets/kats_logo.svg';
import { useNavigate } from 'react-router-dom';
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
import useAuthStore from '../store/useAuthStore';
import useSession from '../hooks/useSession';


const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [typingAnimation, setTypingAnimation] = useState('');
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { checkSession } = useSession();
  const [isCheckingSession, setIsCheckingSession] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        setIsCheckingSession(true);
        await checkSession();  // sets user inside useAuthStore
      } catch (err) {
        // optional: handle errors
      } finally {
        setIsCheckingSession(false);
      }
    })();
  }, []);

  useEffect(() => {
    // Redirect to profile if user is already logged in
    if (user) {
      navigate('/profile', { replace: true });
    }
  }, [user]);


  // Memoized handler to prevent new function creation every render
  const handleSetLogin = useCallback(() => setIsLogin(true), []);
  const handleSetRegister = useCallback(() => setIsLogin(false), []);


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



  if (isCheckingSession) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Checking session...</div>
      </div>
    );
  }



  return (
    <div className="h-[100dvh]">


      <div className="grid lg:grid-cols-2 h-full ">
        {/* Left Side - Login/Register Form */}

        <div className=" lg:bg-none bg-[url('/assets/login-bg-pattern.webp')] mx-auto w-full sm:w-full   lg:w-full  xl:w-3/4  lg:p-6 transform  transition-transform duration-300  flex items-center justify-center flex-col  ">
          <div className='bg-white p-4 rounded-md sm:w-3/4 lg:w-full'>
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center justify-between space-x-3">
                <div>
                  <h1 className="text-base md:text-xl lg:text-2xl font-poppins font-bold text-gray-800 mb-2">
                    {typingAnimation}
                    <span className="animate-pulse text-md font-normal">|</span>
                  </h1>
                  <p className="text-gray-600 font-nunito text-base ">
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
            <div className="hidden md:flex bg-gray-100 rounded-xl p-1 mb-8  ">
              <button
                aria-label="Login Tab"
                onClick={handleSetLogin}
                className={`font-nunito flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${isLogin
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
                className={`font-nunito flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${!isLogin
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
                <Login setIsLogin={setIsLogin} />
              </Suspense>
            ) : (
              <Suspense fallback={<RegisterFormSkeleton />}>
                <Register setIsLogin={setIsLogin} />
              </Suspense>
            )}
          </div>
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

            {isLogin ? (
              <img src='/assets/login_img.webp' alt='services-provided' />
            ) : (
              <>
                <FeaturesList />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
