import React from 'react'
import Shape1 from '../assets/Shape1';
import Shape2 from '../assets/Shape2';
import Shape3 from '../assets/Shape3';
import Shape4 from '../assets/Shape4';
import Shape5 from '../assets/Shape5';

export default function SelectCompany() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden w-full bg-t1 sm:bg-teal-gradient flex flex-col items-center justify-center px-4 sm:px-6 py-8 font-quicksand">
      {/* shapes */}
      <div className="shape-container absolute inset-0 pointer-events-none">
        <Shape1 />
        <Shape2 />
        <Shape5 />
      </div>

      {/* Main Content Container */}
              <div className="relative z-30 w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        {/* Hero Text */}
        <div className="text-white text-center mb-6 sm:mb-8 px-4 ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-wide">
            Welcome to <br className='block sm:hidden' />E-Transport
          </h1>
        </div>

        {/* Form Container */}
        <div className="w-full space-y-4 sm:space-y-6 px-4">
          {/* Choose Organisation */}
          <div className="space-y-2">
            <label className="text-white text-sm sm:text-base font-medium block">
              Choose your organisation
            </label>
            <select className="w-full px-4 py-3 sm:py-4 rounded-full bg-white text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base sm:text-lg transition-all duration-200 hover:shadow-xl">
              <option>Select organisation</option>
            </select>
          </div>

          {/* Financial Year */}
          <div className="space-y-2">
            <label className="text-white text-sm sm:text-base font-medium block">
              Select your financial year
            </label>
            <select className="w-full px-4 py-3 sm:py-4 rounded-full bg-white text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base sm:text-lg transition-all duration-200 hover:shadow-xl">
              <option>Select Period</option>
            </select>
          </div>

          {/* Continue Button */}
          <a href="/app" className="block w-full mt-6 sm:mt-8 px-6 py-3 sm:py-4 bg-white text-teal-600 font-semibold rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-base sm:text-lg text-center">
            Continue
          </a>
        </div>
      </div>

      {/* Bottom shapes */}
      <div className="shape-container absolute bottom-0 left-0 right-0 pointer-events-none">
        <Shape3 />
        <Shape4 />
      </div>
    </div>
  )
}
