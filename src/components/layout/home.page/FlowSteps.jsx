import React, { memo } from 'react';
import { FileText, Zap, Shield, Globe, Award, Play, Pause } from 'lucide-react';

const flowSteps = [
  { name: 'Document Upload', icon: FileText },
  { name: 'AI Processing', icon: Zap },
  { name: 'Validation', icon: Shield },
  { name: 'Integration', icon: Globe },
  { name: 'Compliance', icon: Award },
];

const FlowSteps = ({ isLoaded, currentFlow = 1, isPlaying = true, togglePlay }) => {
  return (
    <section className={`hidden md:block mb-20 transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h3>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={togglePlay}
            className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm font-medium">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-8 relative">
        {flowSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentFlow;
          const isCompleted = index < currentFlow;

          return (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${isActive
                    ? 'bg-gradient-to-br from-teal-500 to-emerald-600 scale-110 shadow-lg'
                    : isCompleted
                      ? 'bg-gradient-to-br from-teal-400 to-emerald-500'
                      : 'bg-gray-200'
                  }`}
              >
                <Icon className={`w-6 h-6 ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`} />
                {isActive && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full opacity-30 animate-ping"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${isActive ? 'text-teal-600' : 'text-gray-600'}`}>
                {step.name}
              </span>

              {/* Connecting line */}
              {index < flowSteps.length - 1 && (
                <div
                  className={`absolute top-8 left-20 w-16 h-0.5 transition-all duration-500 ${isCompleted ? 'bg-gradient-to-r from-teal-400 to-emerald-500' : 'bg-gray-300'
                    }`}
                  style={{ transform: 'translateX(50%)' }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default memo(FlowSteps);
