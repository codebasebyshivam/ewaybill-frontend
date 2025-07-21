import React, { memo } from 'react';
import { Truck, Car, FileText, ScrollText } from 'lucide-react';

const services = [
  {
    id: 'ewaybill',
    name: 'E-Waybill',
    icon: Truck,
    description: 'AI-powered digital transport documentation',
    features: [
      'Real-time GPS tracking',
      'Auto-generation from invoices',
      'Compliance validation',
      'Multi-state support',
    ],
    color: 'from-teal-500 to-emerald-600',
    stats: { processed: '2.5M+', accuracy: '99.8%', time: '30s' },
  },
  {
    id: 'fastag',
    name: 'FASTag',
    icon: Car,
    description: 'Intelligent toll management ecosystem',
    features: [
      'Automated toll payments',
      'Real-time balance alerts',
      'Route optimization',
      'Expense analytics',
    ],
    color: 'from-emerald-500 to-cyan-600',
    stats: { transactions: '1.8M+', savings: '40%', uptime: '99.9%' },
  },
  {
    id: 'rc',
    name: 'RC Management',
    icon: FileText,
    description: 'Smart registration certificate handling',
    features: [
      'Digital document vault',
      'Renewal notifications',
      'Instant verification',
      'Blockchain security',
    ],
    color: 'from-cyan-500 to-blue-600',
    stats: { documents: '500K+', renewals: '95%', security: '256-bit' },
  },
  {
    id: 'challan',
    name: 'e-Challan',
    icon: ScrollText,
    description: 'Proactive violation management',
    features: [
      'Instant notifications',
      'Payment gateway integration',
      'Dispute resolution',
      'Driver scoring',
    ],
    color: 'from-blue-500 to-indigo-600',
    stats: { resolved: '98%', response: '2min', disputes: '15%' },
  },
];

const Services = ({ isLoaded, activeService, setActiveService }) => {
  return (
    <section
      className={`transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Complete Fleet Ecosystem
        </h3>
        <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto">
          Integrated solutions that work together seamlessly to optimize every
          aspect of your fleet operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service) => {
          const Icon = service.icon;
          const isActive = activeService === service.id;

          return (
            <div
              key={service.id}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 cursor-pointer transform transition-all duration-500 ${
                isActive
                  ? 'scale-105 shadow-2xl ring-4 ring-teal-500/20'
                  : 'hover:scale-102'
              }`}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="flex items-start space-x-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} ${isActive ? 'scale-110 shadow-lg' : ''} transition-all`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {service.name}
                  </h4>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-gray-800">
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animated background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color}/10 rounded-3xl transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default memo(Services);
