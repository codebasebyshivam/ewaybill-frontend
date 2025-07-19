import React, { memo, useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, User, Lock, ArrowRight, Zap, CreditCard, Car, Truck, DollarSign, Smartphone, Shield, Users, Mail, Phone, Building, UserPlus, LogIn, CheckCircle, AlertCircle } from 'lucide-react';
import kats_logo from '../assets/kats_logo.svg';

const features = [
  {
    icon: CreditCard,
    title: 'EwayBill',
    desc: 'Digital transport documents',
    color: 'from-blue-500 to-blue-600',
    stats: '50K+ users'
  },
  {
    icon: Zap,
    title: 'FASTag',
    desc: 'Seamless toll payments',
    color: 'from-yellow-500 to-yellow-600',
    stats: '1M+ transactions'
  },
  {
    icon: Truck,
    title: 'RC',
    desc: 'Vehicle registration',
    color: 'from-purple-500 to-purple-600',
    stats: '25K+ vehicles'
  },
  {
    icon: Building,
    title: 'Challan',
    desc: 'Traffic violation management',
    color: 'from-red-500 to-red-600',
    stats: '10K+ resolved'
  }
];


// Sample data for dropdowns (you can replace these with API calls or dynamic data)
const companies = [
  { id: 1, name: 'Company A' },
  { id: 2, name: 'Company B' },
  { id: 3, name: 'Company C' },
];

const financialYears = [
  '2023-2024',
  '2024-2025',
  '2025-2026',
];

const benefits = [
  { icon: Shield, text: 'Bank-level Security', delay: 0 },
  { icon: Zap, text: 'Lightning Fast Processing', delay: 0.2 },
  { icon: Users, text: '24/7 Premium Support', delay: 0.4 },
  { icon: Smartphone, text: 'Mobile-First Experience', delay: 0.6 }
];



const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [typingAnimation, setTypingAnimation] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const containerRef = useRef(null);
  // Login form state
  const [loginData, setLoginData] = useState({
    company: '',
    financialYear: '',
    username: '',
    password: ''
  });
  // Register form state
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    gstin: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  const handleLogin = async () => {
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setNotification({
        type: 'success',
        message: 'Login successful! Welcome back.'
      });

      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }, 2000);
  };


  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);


  // Typing animation for welcome text
  useEffect(() => {
    const text = isLogin ? "Welcome Back" : 'Create Account';
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


  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      setNotification({
        type: 'error',
        message: 'Passwords do not match!'
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setIsLoading(true);

    // Simulate register process
    setTimeout(() => {
      setIsLoading(false);
      setNotification({
        type: 'success',
        message: 'Registration successful! Please login.'
      });

      // Switch to login form after successful registration
      setTimeout(() => {
        setIsLogin(true);
        setNotification(null);
      }, 2000);
    }, 2000);
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
    setNotification(null);
    setLoginData({ company: '', financialYear: '', username: '', password: '' });
    setRegisterData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      gstin: '',
      password: '',
      confirmPassword: ''
    });
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          } transform transition-all duration-300`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-2 h-screen">

        {/* Left Side - Login/Register Form */}
        <div className=" mx-auto w-full sm:w-3/4 lg:w-full  xl:w-3/4 p-4 lg:p-6 transform  transition-transform duration-300  flex item-center justify-center flex-col">
          {/* Logo */}
          <div className="mb-4">
            <div className="flex items-center justify-between space-x-3">
              <div>
                <h1 className="text-2xl font-poppins font-bold text-gray-800 mb-2">
                  {typingAnimation}
                  <span className="animate-pulse text-md font-normal">|</span>
                </h1>
                <p className="text-gray-600 font-nunito">
                  {isLogin ? 'Sign in to access your dashboard' : 'Join us to get started with our services'}
                </p>
              </div>
              <div className="w-12 h-12 bg-action-button-gradient rounded-xl flex items-center justify-center">
                <img src={kats_logo} className='w-7 h-7' alt='kats_logo' />
              </div>
            </div>
          </div>

          {/* Form Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
            <button
              aria-label='Login Tab'
              onClick={() => setIsLogin(true)}
              className={`font-nunito flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${isLogin ? 'bg-action-button-gradient text-white shadow-sm' : 'text-gray-800 hover:text-gray-900'
                }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button
              aria-label='Register Tab'
              onClick={() => setIsLogin(false)}
              className={`font-nunito flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${!isLogin ? 'bg-action-button-gradient text-white shadow-sm' : 'text-gray-800 hover:text-gray-900'
                }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </button>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <div className="space-y-5 animate-fadeIn">

              {/* Company Dropdown */}
              <div className="relative group">
                <label htmlFor='company' className="block text-sm font-medium text-gray-700 mb-2 font-nunito">Select Company</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                  <select
                    id='company'
                    value={loginData.company}
                    onChange={(e) => setLoginData({ ...loginData, company: e.target.value })}
                    className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                  >
                    <option value="" className='text-gray-600'>Select a company</option>
                    {companies.map((company) => (
                      <option className='text-gray-800' key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Financial Year Dropdown */}
              <div className="relative group">
                <label htmlFor='financialYear' className="block text-sm font-medium text-gray-700 mb-2 font-nunito">Select Financial Year</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                  <select
                    id='financialYear'
                    value={loginData.financialYear}
                    onChange={(e) => setLoginData({ ...loginData, financialYear: e.target.value })}
                    className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                  >
                    <option value="" className='text-gray-600'>Select financial year</option>
                    {financialYears.map((year, index) => (
                      <option className='text-gray-800' key={index} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="relative group">
                <label htmlFor='username' className="block text-sm font-medium text-gray-700 mb-2 font-nunito">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                  <input
                    type="text"
                    id='username'
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="relative group">
                <label htmlFor='password' className="block text-sm font-medium text-gray-700 mb-2 font-nunito">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                  <input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="outline-none w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                    placeholder="Enter your password"
                  />
                  <button
                    aria-label={`${showPassword ? 'Show Password' : 'Hide Password'}`}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800  transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-7 h-7 p-1" /> : <Eye className="w-7 h-7 p-1 text-t2" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor='remember me' className="flex items-center">
                  <input id='remember me' type="checkbox" className="w-4 h-4 accent-t1 text-t1 hover:accent-t1 border-gray-300 rounded " />
                  <span className="font-nunito ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="font-nunito text-sm text-teal-800 hover:text-t1 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                aria-label='Login'
                onClick={handleLogin}
                disabled={isLoading || !loginData.username || !loginData.password}
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
            </div>
          ) : (
            /* Register Form */
            <div className="w-full space-y-5 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative group">
                  <label htmlFor='fullname' className="font-nunito block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <input
                      id='fullname'
                      type="text"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor='email' className="font-nunito block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <input
                      id='email'
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative group">
                  <label htmlFor='phonenumber' className="font-nunito block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <input
                      id='phonenumber'
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                      placeholder="Enter phone"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor='company' className="font-nunito block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <input
                      id='company'
                      type="text"
                      value={registerData.company}
                      onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                      className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                      placeholder="Enter company"
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label htmlFor='gstin' className="font-nunito block text-sm font-medium text-gray-700 mb-2">Gstin</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                  <input
                    id='gstin'
                    type="text"
                    value={registerData.gstin}
                    onChange={(e) => setRegisterData({ ...registerData, gstin: e.target.value })}
                    className="outline-none w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                    placeholder="Enter gst number"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative group">
                  <label htmlFor='password' className="font-nunito block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="outline-none w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                      placeholder="Create password"
                    />
                    <button
                      aria-label={`${showPassword ? 'Show Password' : 'Hide Password'}`}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800  transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-7 h-7 p-1" /> : <Eye className="w-7 h-7 p-1 text-t2" />}
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor='confirm-password' className="font-nunito block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <input
                      id='confirm-password'
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="outline-none w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-300"
                      placeholder="Confirm password"
                    />
                    <button
                      aria-label={`${showConfirmPassword ? 'Show Password' : 'Hide Password'}`}
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800  transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-7 h-7 p-1" /> : <Eye className="w-7 h-7 p-1 text-t2" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4  border-gray-300 rounded  accent-t1 hover:accent-t2" />
                <span className="font-nunito ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-t1 hover:text-t2">Terms of Service</a> and <a href="#" className="text-t1 hover:text-t2">Privacy Policy</a>
                </span>
              </div>

              <button
                aria-label='Register Account'
                onClick={handleRegister}
                disabled={isLoading || !registerData.fullName || !registerData.email || !registerData.gstin || !registerData.password || !registerData.confirmPassword}
                className="font-nunito  w-full bg-action-button-gradient text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
            </div>
          )}
        </div>

        {/* Right Section - Features */}
        <div
          className="hidden lg:block bg-action-button-gradient  p-8 md:p-12 text-white shadow-md relative overflow-hidden"
        >


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
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = index === currentFeature;

                return (
                  <div
                    key={index}
                    className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 transform ${isActive ? 'scale-105 bg-white/20 shadow-lg' : 'hover:bg-white/15'
                      }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/30 scale-110' : ''
                        }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="text-green-100 text-sm mt-1">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature Indicators */}
            <div className="flex justify-center space-x-2 mb-8">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentFeature ? 'bg-white w-6' : 'bg-white/40'
                    }`}
                />
              ))}
            </div>


          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default memo(LoginPage);