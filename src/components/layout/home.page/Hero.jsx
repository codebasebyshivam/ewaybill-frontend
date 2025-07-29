import React, { memo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ isLoaded }) => {
  const navigate = useNavigate();

  const handleNavigateToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);
  return (
    <section
      className={`h-[60vh] md:h-[80vh] space-y-4 flex flex-col item-center justify-center text-center  transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <h2 className="text-5xl sm:text-5xl lg:text-7xl font-bold">
        <span className="bg-action-button-gradient bg-clip-text text-transparent font-poppins">
          Smarter Way
        </span>
      </h2>

      <h3 className="text-lg sm:text-2xl lg:text-5xl font-bold text-h1 mb-8 font-poppins">
        to manage your fleet <span className="text-t2">Documents</span>
      </h3>

      <p className="text-sm sm:text-base lg:text-xl text-body max-w-3xl mx-auto mb-12 leading-relaxed font-nunito">
        Transform your fleet operations with our next-generation platform
        featuring AI-powered document processing, real-time compliance
        monitoring, and seamless integration across all touchpoints.
      </p>

      <div className="flex justify-center items-center space-x-6">
        <button
          onClick={handleNavigateToLogin}
          className="group relative bg-action-button-gradient text-white px-10 py-4 rounded-full font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <span className="relative z-10 flex items-center space-x-3">
            <span className="font-nunito text-base">Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  );
};

export default memo(Hero);
