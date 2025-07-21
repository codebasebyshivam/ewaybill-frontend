// src/pages/HomePage.jsx
import { useEffect, useState, Suspense, lazy, useRef, memo, useMemo } from 'react';
import './../css/animate.css';
const FlowStepsSkeleton = lazy(() => import('../components/layout/home.page/skeletons/FlowStepsSkeleton'));
const StatsSkeleton = lazy(() => import('../components/layout/home.page/skeletons/StatsSkeleton'));
const HeroSkeleton = lazy(() => import('../components/layout/home.page/skeletons/HeroSkeleton'));
const ServicesSkeleton = lazy(() => import('../components/layout/home.page/skeletons/ServicesSkeleton'));
const StickyHeaderSkeleton = lazy(() => import('../components/layout/home.page/skeletons/StickyHeaderSkeleton'));
const HomePageSkeleton = lazy(() => import('../components/layout/home.page/skeletons/HomePageSkeleton'));


const StickyHeader = lazy(
  () => import('../components/layout/home.page/StickyHeader')
);
const Hero = lazy(() => import('../components/layout/home.page/Hero'));
const Stats = lazy(() => import('../components/layout/home.page/Stats'));
const FlowSteps = lazy(
  () => import('../components/layout/home.page/FlowSteps')
);
const Services = lazy(() => import('../components/layout/home.page/Services'));
const ParticleBackground = lazy(
  () => import('../components/layout/home.page/ParticleBackground')
);

const HomePage = () => {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [activeService, setActiveService] = useState(null);

  const initParticles = useMemo(() => {
    return (Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }))
    )
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    let animateFrame;

    // window size tracker
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // mouse position tracker

    const handleMouseMove = (e) => {
      if (animateFrame) cancelAnimationFrame(animateFrame);
      animateFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      });
    }
    window.addEventListener('mousemove', handleMouseMove);

    // scroll tracker Scroll event for sticky header
    const handleScroll = () => setIsSticky(window.scrollY > 120);
    window.addEventListener('scroll', handleScroll);
    if (windowWidth < 768) return; // Disable on mobile


    const rafIdle = window.requestIdleCallback || window.requestAnimationFrame;

    setParticles(initParticles);

    const moveParticles = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
          y: (p.y + p.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
      rafIdle(moveParticles);
    };

    rafIdle(moveParticles);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animateFrame);
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);



  return (
    <>
      <main
        ref={containerRef}
        className="min-h-[100dvh] relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
      >
        {/* animated blobs */}
        {windowWidth > 768 && (
          <div className="absolute inset-0 pointer-events-none md:block hidden">
            <div
              className="absolute w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full opacity-20 animate-pulse will-change-transform"
              style={{ transform: 'translate(calc(100vw - 16rem), -8rem)' }}
            />
            <div
              className="absolute w-80 h-80 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full opacity-15 animate-pulse will-change-transform animation-delay-1000"
              style={{
                transform: 'translate(calc(100vw - 12rem - 5rem), 0rem)',
              }}
            />
            <div
              className="absolute w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-10 animate-pulse will-change-transform animation-delay-2000"
              style={{
                transform: 'translate(calc(100vw - 16rem - 8rem), 4rem)',
              }}
            />
          </div>
        )}

        <ParticleBackground
          mousePosition={mousePosition}
          particles={particles}
        />
        <Suspense fallback={<StickyHeaderSkeleton />}>
          <StickyHeader isSticky={isSticky} isLoaded={isLoaded} />
        </Suspense>

        <Suspense fallback={<HeroSkeleton />}>
          <Hero isLoaded={isLoaded} />
        </Suspense>

        <Suspense fallback={<StatsSkeleton />}>
          <Stats isLoaded={isLoaded} />
        </Suspense>

        <Suspense fallback={<FlowStepsSkeleton />}>
          <FlowSteps isLoaded={isLoaded} />
        </Suspense>

        <Suspense fallback={<ServicesSkeleton />}>
          <Services
            isLoaded={isLoaded}
            activeService={activeService}
            setActiveService={setActiveService}
          />
        </Suspense>

      </main>
    </>
  );
};

export default memo(HomePage);
