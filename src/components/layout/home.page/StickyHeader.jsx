import { memo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import kats_logo from '../../../assets/kats_logo.svg';
import { useNavigate } from 'react-router-dom';

const StickyHeader = ({ isSticky, isLoaded }) => {
  const navigate = useNavigate();

  const handleNavigateToLogin = useCallback(() => {
    navigate('/login');
  }, []);

  return (
    <>
      {/* Spacer to prevent layout shift when sticky is applied */}
        <header
        className={`z-30 flex justify-between items-center  px-4 py-4 md:px-8 md:py-6 backdrop-blur-sm border-b transform transition-all duration-1000
        ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
        ${
          isSticky
            ? 'fixed top-0 left-0 w-full shadow-lg bg-white/100 backdrop-blur-md border-teal-100'
            : 'fixed bg-white/10 border-white/20 w-full'
        }
        `}
      >
        {/* Logo & Branding */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="hidden sm:flex w-12 h-12 bg-action-button-gradient rounded-xl items-center justify-center shadow-lg">
              <img src={kats_logo} alt="logo" loading="lazy" className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="font-poppins text-2xl  font-bold bg-action-button-gradient bg-clip-text text-transparent">
              Kats
            </h1>
            <p className="text-xs text-teal-600 font-medium font-nunito hidden sm:block">
              Knowledge Applied and Tested Solutions
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div>
          <button
            onClick={handleNavigateToLogin}
            className="group relative bg-action-button-gradient text-white px-8 py-3 rounded-full font-medium overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center space-x-2">
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
