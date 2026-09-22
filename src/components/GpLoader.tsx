import React, { useEffect, useState } from 'react';

interface GpLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const GpLoader: React.FC<GpLoaderProps> = ({
  onComplete,
  minDuration = 2200,
}) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 600); // fade duration
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070A0F] transition-opacity duration-700 ease-in-out select-none ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* SVG Drawing Loader */}
        <div className="gp-loader flex items-center justify-center">
          <svg
            className="gp-loader-svg"
            viewBox="0 0 220 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Generación Privilegiada"
          >
            <defs>
              {/* Dorado GP */}
              <linearGradient id="gpGoldLoader" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9F7A35" />
                <stop offset="45%" stopColor="#C9A45C" />
                <stop offset="100%" stopColor="#E4C77A" />
              </linearGradient>

              {/* Brillo */}
              <linearGradient id="gpShineLoader" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C9A45C" />
                <stop offset="50%" stopColor="#FFF1B0" />
                <stop offset="100%" stopColor="#C9A45C" />
              </linearGradient>
            </defs>

            {/* CORONA */}
            <path
              className="gp-crown"
              d="M91 21 L97 10 L105 19 L110 8 L116 19 L126 10 L124 24 H93 Z"
              stroke="url(#gpGoldLoader)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fill="none"
              pathLength={100}
            />

            {/* G */}
            <text
              x="52"
              y="78"
              className="gp-letter gp-g"
              stroke="url(#gpGoldLoader)"
              fill="none"
              pathLength={100}
            >
              G
            </text>

            {/* P */}
            <text
              x="108"
              y="78"
              className="gp-letter gp-p"
              stroke="url(#gpGoldLoader)"
              fill="none"
              pathLength={100}
            >
              P
            </text>
          </svg>
        </div>

        {/* GENERACIÓN PRIVILEGIADA appearing with subtle fade */}
        <div className="gp-loader-text mt-3 text-center opacity-0 animate-fade-in-delayed">
          <span className="font-akira text-[11px] sm:text-xs font-bold tracking-[0.3em] text-[#F4F5F7] block">
            GENERACIÓN
          </span>
          <span className="font-akira text-[11px] sm:text-xs font-bold tracking-[0.35em] text-gold-gradient block">
            PRIVILEGIADA
          </span>
        </div>
      </div>
    </div>
  );
};
