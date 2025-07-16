import React, { useState, useEffect, useRef } from 'react';
import { Truck, Car, FileText, Receipt, Code, ScrollText, ArrowRight, Zap, Shield, Clock, BarChart3, Play, Pause, ChevronDown, Star, Users, Globe, Award } from 'lucide-react';
// import kats_logo from '../assets/kats_logo.svg';
export default function HomePage() {
  const [activeService, setActiveService] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [particles, setParticles] = useState([]);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef(null);

  const services = [
    {
      id: 'ewaybill',
      name: 'E-Waybill',
      icon: Truck,
      description: 'AI-powered digital transport documentation',
      features: ['Real-time GPS tracking', 'Auto-generation from invoices', 'Compliance validation', 'Multi-state support'],
      color: 'from-teal-500 to-emerald-600',
      stats: { processed: '2.5M+', accuracy: '99.8%', time: '30s' }
    },
    {
      id: 'fastag',
      name: 'FASTag',
      icon: Car,
      description: 'Intelligent toll management ecosystem',
      features: ['Automated toll payments', 'Real-time balance alerts', 'Route optimization', 'Expense analytics'],
      color: 'from-emerald-500 to-cyan-600',
      stats: { transactions: '1.8M+', savings: '40%', uptime: '99.9%' }
    },
    {
      id: 'rc',
      name: 'RC Management',
      icon: FileText,
      description: 'Smart registration certificate handling',
      features: ['Digital document vault', 'Renewal notifications', 'Instant verification', 'Blockchain security'],
      color: 'from-cyan-500 to-blue-600',
      stats: { documents: '500K+', renewals: '95%', security: '256-bit' }
    },
    {
      id: 'challan',
      name: 'e-Challan',
      icon: ScrollText,
      description: 'Proactive violation management',
      features: ['Instant notifications', 'Payment gateway integration', 'Dispute resolution', 'Driver scoring'],
      color: 'from-blue-500 to-indigo-600',
      stats: { resolved: '98%', response: '2min', disputes: '15%' }
    }
  ];

  const flowSteps = [
    { name: 'Document Upload', icon: FileText, status: 'completed' },
    { name: 'AI Processing', icon: Zap, status: 'active' },
    { name: 'Validation', icon: Shield, status: 'pending' },
    { name: 'Integration', icon: Globe, status: 'pending' },
    { name: 'Compliance', icon: Award, status: 'pending' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'features', name: 'Features', icon: Star },
    { id: 'analytics', name: 'Analytics', icon: Users }
  ];

  useEffect(() => {
    setIsLoaded(true);

    // Sticky header scroll event
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initialize particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(initialParticles);

    // Flow animation
    const flowInterval = setInterval(() => {
      if (isPlaying) {
        setCurrentFlow((prev) => (prev + 1) % flowSteps.length);
      }
    }, 1500);

    // Particle animation
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
      })));
    }, 50);

    return () => {
      clearInterval(flowInterval);
      clearInterval(particleInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    {
      icon: Shield,
      value: '99.9%',
      label: 'Compliance Rate',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      change: '+2.1%',
      trend: 'up'
    },
    {
      icon: Clock,
      value: '85%',
      label: 'Time Saved',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+12%',
      trend: 'up'
    },
    {
      icon: Users,
      value: '500+',
      label: 'Active Fleets',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      change: '+45',
      trend: 'up'
    },
    {
      icon: BarChart3,
      value: '₹2.5Cr',
      label: 'Cost Savings',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+18%',
      trend: 'up'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden ">
      {/* Animated background elements */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full opacity-20 animate-pulse transform translate-x-32 -translate-y-32"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full opacity-15 animate-pulse transform translate-x-28 -translate-y-28 animation-delay-1000"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-10 animate-pulse transform translate-x-24 -translate-y-24 animation-delay-2000"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-bounce animation-delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-bounce animation-delay-1500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-bounce animation-delay-3000"></div>
      </div>




      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.3) 0%, transparent 50%)`
          }}
        />

        {/* Floating particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: 'blur(0.5px)'
            }}
          />
        ))}

        {/* Geometric shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Header */}
      {isSticky && <div style={{ height: '88px' }}></div>}
      <div className={`z-30 flex justify-between items-center px-8 py-6 backdrop-blur-sm bg-white/10 border-b border-white/20 transform transition-all duration-1000
        ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
        ${isSticky ? 'fixed top-0 left-0 w-full shadow-lg bg-white/80 backdrop-blur-md border-b border-teal-100' : 'relative'}
      `}>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="sm:flex hidden w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl  items-center justify-center shadow-lg">
              <img src={kats_logo} className="w-7 h-7 text-white" alt='cmp_logo'/>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl opacity-20 animate-ping"></div>
          </div>
          <div>
            <h1 className="font-poppins text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Kats
            </h1>
            <p className="text-xs text-teal-600 font-medium font-nunito sm:inline-block hidden">Knowledge Applied and Tested Solutions</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
            <span className="hover:text-teal-600 cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-teal-600 cursor-pointer transition-colors">Pricing</span>
            <span className="hover:text-teal-600 cursor-pointer transition-colors">Resources</span>
          </div> */}
          <button className="group relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-3 rounded-full font-medium overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="relative z-10 flex items-center space-x-2">
              <span className='font-nunito'>Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 py-16">
        {/* Hero Section */}
        <div className={`text-center mb-20 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-center mb-6">
            {/* <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-full px-4 py-2"> */}
            {/* <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div> */}
            {/* <span className="text-sm font-medium text-teal-700">AI-Powered Fleet Management</span> */}
            {/* </div> */}
          </div>

          <h2 className="text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent font-poppins">
              Smarter Way
            </span>
          </h2>
          <h3 className="text-5xl font-bold text-gray-800 mb-8 font-poppins">
            to manage your fleet <span className="text-teal-600">Documents</span>
          </h3>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-nunito">
            Transform your fleet operations with our next-generation platform featuring AI-powered document processing, real-time compliance monitoring, and seamless integration across all touchpoints.
          </p>

          <div className="flex justify-center items-center space-x-6">
            <button className="group relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10 flex items-center space-x-3">
                <span className='font-nunito'>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* <button className="group flex items-center space-x-3 text-teal-600 font-medium hover:text-teal-700 transition-colors">
              <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span>Watch Demo</span>
            </button> */}
          </div>
        </div>

        {/* Interactive Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;
            return (
              <div
                key={index}
                className={`relative group cursor-pointer transform transition-all duration-500 ${isHovered ? 'scale-110 -translate-y-2' : 'hover:scale-105'}`}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 transition-all duration-300 ${isHovered ? 'shadow-2xl' : 'hover:shadow-xl'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${stat.bgColor} transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                      <div className="text-xs text-gray-500">vs last month</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color.replace('text-', 'from-').replace('-600', '-500/20 to-').replace('-600', '-600/20')} rounded-3xl transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
            );
          })}
        </div>

        {/* Process Flow */}
        <div className={`mb-20 transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h3>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm font-medium">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentFlow;
              const isCompleted = index < currentFlow;

              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${isActive ? 'bg-gradient-to-br from-teal-500 to-emerald-600 scale-110 shadow-lg' :
                      isCompleted ? 'bg-gradient-to-br from-teal-400 to-emerald-500' :
                        'bg-gray-200'
                    }`}>
                    <Icon className={`w-6 h-6 ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`} />
                    {isActive && (
                      <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full opacity-30 animate-ping"></div>
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${isActive ? 'text-teal-600' : 'text-gray-600'}`}>
                    {step.name}
                  </span>
                  {index < flowSteps.length - 1 && (
                    <div className={`absolute top-8 left-20 w-16 h-0.5 transition-all duration-500 ${isCompleted ? 'bg-gradient-to-r from-teal-400 to-emerald-500' : 'bg-gray-300'
                      }`} style={{ transform: 'translateX(50%)' }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Services */}
        <div className={`transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Complete Fleet Ecosystem</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Integrated solutions that work together seamlessly to optimize every aspect of your fleet operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;

              return (
                <div
                  key={service.id}
                  className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 cursor-pointer transform transition-all duration-500 hover:shadow-2xl ${isActive ? 'scale-105 shadow-2xl ring-4 ring-teal-500/20' : 'hover:scale-102'
                    }`}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)

                  }
                >
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} transition-all duration-300 ${isActive ? 'scale-110 shadow-lg' : ''}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h4>
                      <p className="text-gray-600 mb-4">{service.description}</p>

                      <div className={`grid grid-cols-2 gap-4 mb-6 transition-all duration-300 `}>
                        {Object.entries(service.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-gray-800">{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      <div className={`space-y-3 transition-all duration-300 ${isActive ? 'translate-y-0' : 'translate-y-4'}`}>
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full"></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-3xl transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .animation-delay-3000 { animation-delay: 3000ms; }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}