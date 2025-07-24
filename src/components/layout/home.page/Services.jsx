import React, { memo } from 'react';
import ScrollReveal from '../../common/ScrollReveal';
import challan_image from '/assets/challan-api.webp';
import ewaybill_api from '/assets/ewaybill-api.webp';
import fastag_api from '/assets/fastag-api.webp';
import rc_api from '/assets/rc-api.webp';
import dl_api from '/assets/dl-api.webp';


const services = [
  {
    id: 'ewaybill',
    name: 'E-Waybill',
    url: ewaybill_api,
    description:
      'Seamlessly generate and validate digital transport documents using our secure E-Waybill API. Automate compliance, reduce manual errors, and accelerate logistics workflows with AI-powered processing.',
  },
  {
    id: 'rc',
    name: 'RC Management',
    url: rc_api,
    description:
      'Instantly fetch and validate vehicle registration certificate (RC) details via our API. Perfect for lenders, insurers, and mobility platforms seeking quick and compliant KYC integration.',
  },
  {
    id: 'fastag',
    name: 'FASTag',
    url: fastag_api,
    description:
      'Access real-time FASTag data and enable digital toll tracking, verification, and account status. Empower fleet managers, aggregators, and fintechs with smart toll infrastructure insights.',
  },
  {
    id: 'challan',
    name: 'E-Challan',
    url: challan_image,
    description:
      'Instantly fetch challan data for any vehicle using our secure API. Improve risk analysis, track violations, and simplify payment handling with real-time government challan integration.',
  },
  {
    id: 'dl',
    name: 'Driving License',
    url:dl_api,
    description:
      'Driving License (DL) Verification Verify driving license details instantly with our DL API. Ideal for insurers, mobility providers, and background verifiers seeking fast, secure, and real-time DL validation across India.',
  },
];

const Services = ({ isLoaded }) => {
  const getDelay = (index) => 0.1 + index * 0.1;

  return (
    <div className='relative bg-white bg-fixed bg-left bg-no-repeat bg-contain md:bg-[url("/assets/PathFillGreenBg.svg")] p-8 '>

      <section
        className={`transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } p-4`}
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

        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          {services.map((service, i) => {
            const isImageLeft = i % 2 === 0;
            return (
              <ScrollReveal delay={getDelay(i)} key={service.id}>
                <div className="group relative p-4 cursor-pointer service-card">
                  <div
                    className={`flex items-start md:space-x-6 flex-col ${
                      isImageLeft ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                  
                    <img
                      src={service.url}
                      loading="lazy"
                      alt={`${service.name} API`}
                      className="w-[400px] h-[400px] rounded-2xl"
                    />
                    <div className="flex-1">
                      <h4 className="text-2xl font-extrabold text-h1 mb-2 font-nunito">
                        {service.name}
                      </h4>
                      <p className="text-black mb-4 font-nunito">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default memo(Services);
