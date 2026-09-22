import React from 'react';

interface GpLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'white' | 'neon';
}

export const GpLogo: React.FC<GpLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-xs tracking-widest',
    md: 'text-sm tracking-wider',
    lg: 'text-lg tracking-widest',
    xl: 'text-2xl tracking-widest',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* GP Icon with subtle crown */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 100 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(201,164,92,0.3)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="gpLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DC96" />
              <stop offset="50%" stopColor="#C9A45C" />
              <stop offset="100%" stopColor="#96742E" />
            </linearGradient>
          </defs>

          {/* Secondary subtle crown */}
          <g stroke="url(#gpLogoGradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M36 21 L41 12 L50 18 L59 12 L64 21 Z" fill="url(#gpLogoGradient)" fillOpacity="0.2" />
            <circle cx="41" cy="11.5" r="1.2" fill="#E4C77A" />
            <circle cx="50" cy="16.5" r="1.2" fill="#E4C77A" />
            <circle cx="59" cy="11.5" r="1.2" fill="#E4C77A" />
          </g>

          {/* Interlocked stylized G and P monogram */}
          <g stroke="url(#gpLogoGradient)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
            {/* G outer curve and crossbar */}
            <path d="M40 37 C31 34, 18 41, 18 54 C18 68, 29 74, 42 74 C54 74, 61 65, 61 54 L61 50 L45 50" />
            
            {/* P vertical stroke and head loop */}
            <path d="M57 32 L57 74" />
            <path d="M57 32 C67 32, 79 33, 79 43 C79 53, 67 54, 57 54" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-akira font-bold text-[#F4F5F7] tracking-wider ${textSizes[size]}`}>
            GENERACIÓN
          </span>
          <span className={`font-akira font-bold text-gold-gradient tracking-widest ${textSizes[size]}`}>
            PRIVILEGIADA
          </span>
        </div>
      )}
    </div>
  );
};
