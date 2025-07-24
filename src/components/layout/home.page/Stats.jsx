import React, { memo, useState } from 'react';
import { Shield, Clock, Users, BarChart3 } from 'lucide-react';

const statsData = [
  {
    icon: Shield,
    value: '99.9%',
    label: 'Compliance Rate',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    change: '+2.1%',
  },
  {
    icon: Clock,
    value: '85%',
    label: 'Time Saved',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    change: '+12%',
  },
  {
    icon: Users,
    value: '500+',
    label: 'Active Fleets',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    change: '+45',
  },
  {
    icon: BarChart3,
    value: '₹2.5Cr',
    label: 'Cost Savings',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    change: '+18%',
  },
];

const Stats = ({ isLoaded }) => {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <section
      className={`bg-white  px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-10  transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        const isHovered = hoveredStat === index;

        return (
          <div
            key={index}
            className={`relative group cursor-pointer transform transition-all duration-500 ${isHovered ? '-translate-y-2' : ''}`}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div
              className={` bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 transition-all duration-300 ${isHovered ? 'shadow-2xl' : 'hover:shadow-xl'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl ${stat.bgColor} transition-all duration-300`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-600 font-medium">
                    {stat.change}
                  </div>
                  <div className="text-xs text-gray-500">vs last month</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default memo(Stats);
