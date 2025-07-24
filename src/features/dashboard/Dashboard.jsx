import React from 'react';
import {
  Users,
  DollarSign,
  Award,
  TrendingUp,
  ArrowUpRight,
  Activity,
  BarChart3,
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back! Here's your business at a glance
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="inline-flex items-center bg-blue-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-blue-700 text-sm font-medium">Live Data</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg mr-3">
                <Users className="text-indigo-600 w-6 h-6" />
              </div>
              <h2 className="text-slate-600 font-medium">Total Users</h2>
            </div>
            <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              12%
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-800">1,234</p>
              <p className="text-slate-500 text-sm mt-1">+28 this week</p>
            </div>
            <div className="h-12 flex items-end">
              <div className="w-2 h-4 bg-indigo-100 rounded-sm mx-px"></div>
              <div className="w-2 h-5 bg-indigo-200 rounded-sm mx-px"></div>
              <div className="w-2 h-6 bg-indigo-300 rounded-sm mx-px"></div>
              <div className="w-2 h-8 bg-indigo-400 rounded-sm mx-px"></div>
              <div className="w-2 h-10 bg-indigo-500 rounded-sm mx-px"></div>
              <div className="w-2 h-12 bg-indigo-600 rounded-sm mx-px"></div>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-lg mr-3">
                <DollarSign className="text-emerald-600 w-6 h-6" />
              </div>
              <h2 className="text-slate-600 font-medium">Revenue</h2>
            </div>
            <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              8.2%
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-800">$12,345</p>
              <p className="text-slate-500 text-sm mt-1">+$1,200 this month</p>
            </div>
            <div className="h-12 flex items-end">
              <div className="w-8 h-4 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-sm mx-px"></div>
              <div className="w-8 h-6 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-sm mx-px"></div>
              <div className="w-8 h-8 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-sm mx-px"></div>
              <div className="w-8 h-12 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-sm mx-px"></div>
            </div>
          </div>
        </div>

        {/* Subscriptions Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-lg mr-3">
                <Award className="text-amber-600 w-6 h-6" />
              </div>
              <h2 className="text-slate-600 font-medium">Subscriptions</h2>
            </div>
            <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              5.3%
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-800">567</p>
              <p className="text-slate-500 text-sm mt-1">86% retention rate</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 relative">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#fef3c7"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#f59e0b"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="126"
                  strokeDashoffset="18"
                />
              </svg>
              <span className="absolute text-xs font-medium">86%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-slate-700">Growth Overview</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md">
                Monthly
              </button>
              <button className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-md">
                Yearly
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between px-2">
            <div className="flex flex-col items-center">
              <div
                className="w-12 rounded-t-lg bg-blue-500"
                style={{ height: '40%' }}
              ></div>
              <span className="text-xs text-slate-500 mt-1">Jan</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-12 rounded-t-lg bg-blue-500"
                style={{ height: '60%' }}
              ></div>
              <span className="text-xs text-slate-500 mt-1">Feb</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-12 rounded-t-lg bg-blue-500"
                style={{ height: '45%' }}
              ></div>
              <span className="text-xs text-slate-500 mt-1">Mar</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-12 rounded-t-lg bg-blue-500"
                style={{ height: '80%' }}
              ></div>
              <span className="text-xs text-slate-500 mt-1">Apr</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-12 rounded-t-lg bg-blue-500"
                style={{ height: '65%' }}
              ></div>
              <span className="text-xs text-slate-500 mt-1">May</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-12 rounded-t-lg bg-blue-500"
                style={{ height: '90%' }}
              ></div>
              <span className="text-xs text-slate-500 mt-1">Jun</span>
            </div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-medium text-slate-700 mb-4">Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Site Traffic</span>
                <span className="text-slate-800 font-medium">8.8k</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Conversion Rate</span>
                <span className="text-slate-800 font-medium">2.4%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: '45%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">User Engagement</span>
                <span className="text-slate-800 font-medium">12min</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: '65%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
