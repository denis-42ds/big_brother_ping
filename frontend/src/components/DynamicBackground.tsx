import React from 'react'

interface DynamicBackgroundProps {
  section?: 'hero' | 'features' | 'stats' | 'dashboard' | 'footer' | 'login' | 'main'
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Simple Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Simple Animated Orbs */}
      <div className="absolute inset-0">
        {/* Primary Orb */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl bg-apple-blue/2 animate-float"
          style={{
            left: '10%',
            top: '20%'
          }}
        />

        {/* Secondary Orb */}
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl bg-apple-green/2 animate-float"
          style={{
            right: '15%',
            top: '60%',
            animationDelay: '5s'
          }}
        />

      </div>

      {/* Simple Floating Particles */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`particle-${index}`}
          className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
          style={{
            left: `${30 + index * 20}%`,
            top: `${40 + index * 15}%`,
            animationDelay: `${index * 2}s`
          }}
        />
      ))}
    </div>
  )
}

export default DynamicBackground