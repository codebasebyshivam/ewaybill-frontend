import React, { memo } from 'react';
import ScrollReveal from '../../common/ScrollReveal';
import { Truck, Car, FileText, ScrollText } from 'lucide-react';
import challan_image from '../../../assets/challan-api.webp';
import ewaybill_api from '../../../assets/ewaybill-api.webp';
import fastag_api from '../../../assets/fastag-api.webp';
import rc_api from '../../../assets/rc-api.webp';

const services = [
  {
    id: 'ewaybill',
    name: 'E-Waybill',
    icon: Truck,
    url: ewaybill_api,
    description: 'Seamlessly generate and validate digital transport documents using our secure E-Waybill API. Automate compliance, reduce manual errors, and accelerate logistics workflows with AI-powered processing.',
    features: [
      'Real-time GPS tracking',
      'Auto-generation from invoices',
      'Compliance validation',
      'Multi-state support',
    ],
    color: 'from-teal-500 to-emerald-600',
    stats: { processed: '2.5M+', accuracy: '99.8%', time: '30s' },
  },
];
const services2 = [
  {
    id: 'rc',
    name: 'RC Management',
    icon: FileText,
    url: rc_api,
    description: 'Instantly fetch and validate vehicle registration certificate (RC) details via our API. Perfect for lenders, insurers, and mobility platforms seeking quick and compliant KYC integration.',
    features: [
      'Digital document vault',
      'Renewal notifications',
      'Instant verification',
      'Blockchain security',
    ],
    color: 'from-cyan-500 to-blue-600',
    stats: { documents: '500K+', renewals: '95%', security: '256-bit' },
  },
]

const services3 = [
  {
    id: 'fastag',
    name: 'FASTag',
    icon: Car,
    url: fastag_api,
    description: 'Access real-time FASTag data and enable digital toll tracking, verification, and account status. Empower fleet managers, aggregators, and fintechs with smart toll infrastructure insights.',
    features: [
      'Automated toll payments',
      'Real-time balance alerts',
      'Route optimization',
      'Expense analytics',
    ],
    color: 'from-emerald-500 to-cyan-600',
    stats: { transactions: '1.8M+', savings: '40%', uptime: '99.9%' },
  },
]

const services4 = [
  {
    id: 'challan',
    name: 'E-Challan',
    icon: ScrollText,
    url: challan_image,
    description: 'Instantly fetch challan data for any vehicle using our secure API. Improve risk analysis, track violations, and simplify payment handling with real-time government challan integration.',
    features: [
      'Instant notifications',
      'Payment gateway integration',
      'Dispute resolution',
      'Driver scoring',
    ],
    color: 'from-blue-500 to-indigo-600',
    stats: { resolved: '98%', response: '2min', disputes: '15%' },
  },
]
const Services = ({ isLoaded, activeService, setActiveService }) => {
  // Helper to get delay for each item
  const getDelay = (index) => 0.1 + index * 0.1;

  return (
    <div className='bg-[#F9F9F9] bg-fixed bg-cover bg-center bg-no-repeat md:bg-[url("/assets/PathFillGreenBg.svg")] p-8'>
      <section
        className={`transition-all duration-1000 \
    ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}  \
     p-4`}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold font-poppins text-h1 mb-4">
            Complete Fleet Ecosystem
          </h3>
          <p className="text-sm md:text-xl text-h1 font-nunito max-w-2xl mx-auto">
            Integrated solutions that work together seamlessly to optimize every
            aspect of your fleet operations.
          </p>
        </div>
        <div className="grid grid-cols-1  gap-8 max-w-5xl mx-auto ">
          {services.map((service, i) => {
            return (
              <ScrollReveal delay={getDelay(i)} key={service.id}>
                <div
                  className={`group relative p-4  cursor-pointer service-card`}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="flex items-start md:space-x-6 flex-col-reverse md:flex-row">
                 
                      <img src={service.url} loading="lazy" alt={`${service.name} API`} className='w-80 h-80 rounded-2xl ' />
                   
                    <div className="flex-1">
                      <h4 className="text-2xl font-extrabold text-h1 mb-2 font-nunito">
                        {service.name}
                      </h4>
                      <p className="text-h1 mb-4 font-nunito">{service.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
          {services2.map((service, i) => {
            return (
              <ScrollReveal delay={getDelay(i + services.length)} key={service.id}>
                <div
                  className={`group relative p-4  cursor-pointer service-card`}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="flex items-start md:space-x-6 flex-col md:flex-row">
                    <div className="flex-1">
                      <h4 className="text-2xl font-extrabold text-h1 mb-2 font-nunito">
                        {service.name}
                      </h4>
                      <p className="text-h1 mb-4 font-nunito">{service.description}</p>
                    </div>
                   
                      <img src={service.url} loading="lazy" alt={`${service.name} API`} className='w-80 h-80 rounded-2xl bg-black/20 backdrop-blur-xl shadow-2xl shadow-white' />
                    
                  </div>
                </div>
               </ScrollReveal>
            );
          })}
          {services3.map((service, i) => {
            return (
              <ScrollReveal delay={getDelay(i + services.length + services2.length)} key={service.id}>
                <div
                  className={`group relative p-4  cursor-pointer service-card`}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="flex items-start md:space-x-6 flex-col-reverse md:flex-row">
                
                      <img src={service.url} loading="lazy" alt={`${service.name} API`} className='w-80 h-80 rounded-2xl bg-black/20 backdrop-blur-xl shadow-2xl shadow-white' />
                   
                    <div className="flex-1">
                      <h4 className="text-2xl font-extrabold text-h1 mb-2 font-nunito">
                        {service.name}
                      </h4>
                      <p className="text-h1 mb-4 font-nunito">{service.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
          {services4.map((service, i) => {
            return (
              <ScrollReveal delay={getDelay(i + services.length + services2.length + services3.length)} key={service.id}>
                <div
                  className={`group relative p-4  cursor-pointer service-card`}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="flex items-start  md:space-x-6 flex-col md:flex-row">
                    <div className="flex-1">
                      <h4 className="text-2xl font-extrabold text-h1 mb-2 font-nunito">
                        {service.name}
                      </h4>
                      <p className="text-h1 mb-4 font-nunito">{service.description}</p>
                    </div>
                 
                      <img src={service.url} loading="lazy" alt={`${service.name} API`} className='w-80 h-80 rounded-2xl bg-black/20 backdrop-blur-xl shadow-2xl shadow-white' />
                 
                  </div>
                </div>
               </ScrollReveal>
            );
          })}
        </div>
      </section >
    </div >
  );
};

export default memo(Services);
