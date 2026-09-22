import React, { useEffect, useState } from 'react';

interface GpLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const GpLoader: React.FC<GpLoaderProps> = ({
  onComplete,
  minDuration = 2400,
}) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 600);
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
        {/* SVG Drawing Loader with Perfectly Spaced Vector Paths */}
        <div className="gp-loader flex items-center justify-center">
          <svg
            className="gp-loader-svg"
            viewBox="0 0 240 110"
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

            {/* CORONA (Centered at x=120) */}
            <path
              className="gp-crown"
              d="M102 23 L108 12 L115 19 L120 10 L125 19 L132 12 L138 23 Z"
              stroke="url(#gpGoldLoader)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              pathLength={100}
            />

            {/* G Path - Clean, separated, no internal stray lines */}
            <path
              className="gp-path gp-g"
              d="M106 48 L106 42 L64 42 C48 42, 48 88, 64 88 L106 88 L106 65 L80 65"
              stroke="url(#gpGoldLoader)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              pathLength={100}
            />

            {/* P Path - Well separated from G with generous spacing, single continuous contour */}
            <path
              className="gp-path gp-p"
              d="M136 88 L136 42 L168 42 C184 42, 184 65, 168 65 L136 65"
              stroke="url(#gpGoldLoader)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              pathLength={100}
            />
          </svg>
        </div>

        {/* GENERACIÓN PRIVILEGIADA appearing with subtle fade underneath */}
        <div className="gp-loader-text mt-4 text-center opacity-0 animate-fade-in-delayed">
          <span className="font-akira text-[11px] sm:text-xs font-bold tracking-[0.3em] text-[#F4F5F7] block">
            GENERACIÓN
          </span>
          <span className="font-akira text-[11px] sm:text-xs font-bold tracking-[0.35em] text-gold-gradient block mt-0.5">
            PRIVILEGIADA
          </span>
        </div>
      </div>
    </div>
  );
};
