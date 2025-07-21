// src/components/DashboardCard.js
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  accentColor,
  footerText,
  footerIcon,
  isProgressBar,
  progressValue,
  children
}) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-t-4 border-indigo-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
        {Icon && <Icon className={`${accentColor} text-3xl`} />}
      </div>

      {!isProgressBar ? (
        <p className="text-4xl font-extrabold text-gray-50">{value}</p>
      ) : (
        <div className="mt-2 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300">Completion:</span>
            <span className="text-indigo-400 font-bold">{progressValue}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-indigo-500 h-2.5 rounded-full"
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        </div>
      )}

      {footerText && (
        <p className="text-gray-400 mt-2 text-sm flex items-center">
          {footerIcon === 'arrow-up' && (
            <ArrowUp className="text-green-400 w-4 h-4 mr-1" />
          )}
          {footerIcon === 'arrow-down' && (
            <ArrowDown className="text-red-400 w-4 h-4 mr-1" />
          )}
          {footerText}
        </p>
      )}

      {children}
    </div>
  );
};

export default DashboardCard;
