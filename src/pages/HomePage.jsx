// src/pages/HomePage.jsx
import React, { useEffect, useState, Suspense, lazy, useRef } from 'react';
import './../css/animate.css';
const StickyHeader = lazy(() => import('../components/layout/home.page/StickyHeader'));
const Hero = lazy(() => import('../components/layout/home.page/Hero'));
const Stats = lazy(() => import('../components/layout/home.page/Stats'));
const FlowSteps = lazy(() => import('../components/layout/home.page/FlowSteps'));
const Services = lazy(() => import('../components/layout/home.page/Services'));
const ParticleBackground = lazy(() => import('../components/layout/home.page/ParticleBackground'));



export default function HomePage() {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [activeService, setActiveService] = useState(null);



  useEffect(() => {

    setIsLoaded(true);


    // window size tracker
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // mouse position tracker
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    // scroll tracker Scroll event for sticky header
    const handleScroll = () => setIsSticky(window.scrollY > 120);
    window.addEventListener('scroll', handleScroll);
    if (windowWidth < 768) return; // Disable on mobile

    const initParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(initParticles);


    const moveParticles = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
          y: (p.y + p.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
      requestIdleCallback(moveParticles);
    };

    requestIdleCallback(moveParticles);


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <main ref={containerRef} className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">

        {/* animated blobs */}
        {windowWidth > 768 && (
          <div className="absolute inset-0 pointer-events-none md:block hidden">
            <div
              className="absolute w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full opacity-20 animate-pulse will-change-transform"
              style={{ transform: 'translate(calc(100vw - 16rem), -8rem)' }}
            />
            <div
              className="absolute w-80 h-80 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full opacity-15 animate-pulse will-change-transform animation-delay-1000"
              style={{ transform: 'translate(calc(100vw - 12rem - 5rem), 0rem)' }}
            />
            <div
              className="absolute w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-10 animate-pulse will-change-transform animation-delay-2000"
              style={{ transform: 'translate(calc(100vw - 16rem - 8rem), 4rem)' }}
            />
            <div
              className="absolute w-2 h-2 bg-teal-400 rounded-full animate-bounce animation-delay-500 will-change-transform"
              style={{ transform: 'translate(25vw, 25vh)' }}
            />
            <div
              className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-bounce animation-delay-1500 will-change-transform"
              style={{ transform: 'translate(66vw, 33vh)' }}
            />
            <div
              className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-bounce animation-delay-3000 will-change-transform"
              style={{ transform: 'translate(33vw, 75vh)' }}
            />
          </div>
        )}



        <Suspense fallback={null}>



          <ParticleBackground
            mousePosition={mousePosition}
            particles={particles}
          />
          <StickyHeader isSticky={isSticky} isLoaded={isLoaded} />


          <div className="relative z-10 px-6 md:px-12 py-16">
            {/* TODO: Add Hero */}
            <Hero isLoaded={isLoaded} />

            {/* TODO: Add Stats */}
            <Stats isLoaded={isLoaded} />

            {/* TODO: Add FlowSteps */}
            <FlowSteps isLoaded={isLoaded} />

            <Services
              isLoaded={isLoaded}
              activeService={activeService}
              setActiveService={setActiveService}
            />
          </div>
        </Suspense>

      </main>
    </>
  );
}
