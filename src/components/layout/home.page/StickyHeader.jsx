import React, { memo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import kats_logo from '../../../assets/kats_logo.svg';
import { useNavigate } from 'react-router-dom';




const StickyHeader = ({ isSticky, isLoaded }) => {
  const navigate = useNavigate();


  const handleNavigateToLogin = useCallback(()=>{
          navigate('/login');
  },[]);
  return (
    <>
      {/* Spacer to prevent layout shift when sticky is applied */}
      {isSticky && <div  style={{ height: '88px' }}></div>}

      <header
        className={`z-30 flex justify-between items-center px-8 py-6 backdrop-blur-sm border-b transform transition-all duration-1000
        ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
        ${isSticky
            ? 'fixed top-0 left-0 w-full shadow-lg bg-white/90 backdrop-blur-md border-teal-100'
            : 'relative bg-white/10 border-white/20'}
        `}
      >
        {/* Logo & Branding */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="hidden sm:flex w-12 h-12 bg-action-button-gradient rounded-xl items-center justify-center shadow-lg">
              <img src={kats_logo} alt="logo" className="w-7 h-7 text-white" />
            </div>
            {/* <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl opacity-20 animate-ping"></div> */}
          </div>
          <div>
            <h1 className="font-poppins text-2xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Kats
            </h1>
            <p className="text-xs text-teal-600 font-medium font-nunito hidden sm:block">
              Knowledge Applied and Tested Solutions
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div>
          <button className="group relative bg-action-button-gradient text-white px-8 py-3 rounded-full font-medium overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="relative z-10 flex items-center space-x-2" onClick={handleNavigateToLogin}>
              <span className="font-nunito">Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </header>
    </>
  );
};

export default memo(StickyHeader);
