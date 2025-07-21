import { useState, useEffect, useRef, memo } from 'react';
import {
  Home,
  Search,
  ArrowLeft,
  Zap,
  Sparkles,
  Rocket,
  Star,
} from 'lucide-react';

const PageNotFound = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [glitchText, setGlitchText] = useState('404');
  const containerRef = useRef(null);

  const glitchChars = ['4', '0', '4', '█', '▓', '▒', '░', '4', '0', '4'];

  useEffect(() => {
    setIsLoaded(true);

    // Create particles
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981'][
          Math.floor(Math.random() * 4)
        ],
      });
    }
    setParticles(newParticles);

    // Glitch effect for 404 text
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const glitched = '404'
          .split('')
          .map(
            () => glitchChars[Math.floor(Math.random() * glitchChars.length)]
          )
          .join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText('404'), 150);
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAction = (action) => {
    // Add ripple effect
    const button = document.activeElement;
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 300);
    }

    switch (action) {
      case 'home':
        window.location.href = '/';
        break;
      case 'back':
        window.history.back();
        break;
      case 'search':
        console.log('Opening search...');
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-[100dvh] bg-black overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
          rgba(139, 92, 246, 0.3) 0%, 
          rgba(236, 72, 153, 0.2) 25%, 
          rgba(0, 0, 0, 0.9) 50%, 
          rgba(0, 0, 0, 1) 100%)`,
      }}
    >
      {/* Animated particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.opacity,
            animation: `float ${particle.speed + 3}s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        />
      ))}

      {/* Main content container */}
      <div
        className={`relative z-10 min-h-[100dvh] flex items-center justify-center p-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-4xl w-full">
          {/* Holographic 404 */}
          <div className="text-center mb-12 relative">
            <div className="relative inline-block">
              <h1 className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 leading-none select-none">
                {glitchText}
              </h1>
              <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-purple-500 opacity-20 blur-sm animate-pulse">
                404
              </div>
              <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-cyan-400 opacity-10 blur-md animate-ping">
                404
              </div>
            </div>

            {/* Floating elements around 404 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <Sparkles className="absolute top-1/4 left-1/4 w-8 h-8 text-yellow-400 animate-spin" />
              <Star className="absolute top-1/3 right-1/4 w-6 h-6 text-pink-400 animate-pulse" />
              <Zap className="absolute bottom-1/3 left-1/3 w-10 h-10 text-cyan-400 animate-bounce" />
            </div>
          </div>

          {/* Interactive message area */}
          <div className="text-center mb-12 space-y-6">
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Houston,
                </span>
                <br />
                <span className="text-white">We have a problem</span>
              </h2>
              <div className="absolute -top-4 -right-4 md:-right-8">
                <Rocket className="w-12 h-12 text-orange-500 animate-bounce" />
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for has been launched into orbit.
              <span className="text-purple-400 font-semibold">
                {' '}
                Don't panic!
              </span>
              <br />
              Mission control is here to help.
            </p>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => handleAction('home')}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Home className="w-6 h-6 group-hover:animate-pulse" />
                <span className="text-lg">Launch Home</span>
              </div>
            </button>

            <button
              onClick={() => handleAction('back')}
              className="group relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold py-4 px-8 rounded-full transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-slate-500/50"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" />
                <span className="text-lg">Go Back</span>
              </div>
            </button>

            <button
              onClick={() => handleAction('search')}
              className="group relative overflow-hidden border-2 border-cyan-400 hover:bg-cyan-400 text-cyan-400 hover:text-black font-bold py-4 px-8 rounded-full transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Search className="w-6 h-6 group-hover:animate-spin" />
                <span className="text-lg">Search Galaxy</span>
              </div>
            </button>
          </div>

          {/* Futuristic info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group relative p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-3xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Check URL spelling</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    <span>Try the search function</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>Return to homepage</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative p-8 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-lg rounded-3xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-orange-400" />
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Contact support team</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Browse documentation</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span>Report this issue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-300 font-medium">
                Error 404 | Page Not Found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default memo(PageNotFound);
