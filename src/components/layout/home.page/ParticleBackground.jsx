import React, { memo } from 'react';

const ParticleBackground = ({ particles }) => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Radial mouse-follow glow */}
      {/* <div className="absolute inset-0 opacity-30 pointer-events-none" /> */}

      {/* Floating animated particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Faint blurred blobs (optimized with transform) */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Top-right blob */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse will-change-transform"
          style={{ transform: 'translate(calc(100vw - 24rem), -2rem)' }}
        />

        {/* Bottom-left blob */}
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse will-change-transform animation-delay-1000"
          style={{ transform: 'translate(-2rem, calc(100vh - 20rem))' }}
        />
      </div>
    </div>
  );
};

export default memo(ParticleBackground);
