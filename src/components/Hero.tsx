import React from 'react';
import { Play } from 'lucide-react';
import { GP_CONFIG } from '../data/gpData';

interface HeroProps {
  onWatchLatest: () => void;
  onViewSchedule: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchLatest, onViewSchedule }) => {
  return (
    <section id="inicio" className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Studio Photography with Cinematic Lighting */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="/images/studio-hero.jpg"
          alt="Estudio Generación Privilegiada"
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Seamless Vignette & Dark Blue Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F] via-[#070A0F]/85 to-transparent lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/50 to-[#070A0F]/60" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/90 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          
          {/* Subtle Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-[#C9A45C]/60" />
            <span className="text-[12px] font-semibold tracking-[0.25em] text-[#AEB6C2] uppercase">
              BIENVENIDOS A
            </span>
          </div>

          {/* Akira Title */}
          <h1 className="font-akira font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-5">
            <span className="block text-[#F4F5F7] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              GENERACIÓN
            </span>
            <span className="block text-gold-gradient drop-shadow-[0_4px_30px_rgba(201,164,92,0.25)]">
              PRIVILEGIADA
            </span>
          </h1>

          {/* Concise, impactful Subtitle */}
          <p className="font-sans text-sm sm:text-base text-[#AEB6C2] leading-relaxed max-w-lg mb-8">
            {GP_CONFIG.subtext}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Primary Gold Button */}
            <button
              onClick={onWatchLatest}
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(201,164,92,0.35)] hover:shadow-[0_0_30px_rgba(201,164,92,0.5)] transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-[#070A0F] stroke-none" />
              <span>VER ÚLTIMO PROGRAMA</span>
            </button>

            {/* Secondary Ghost Button */}
            <button
              onClick={onViewSchedule}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-transparent hover:bg-white/[0.04] text-[#F4F5F7] hover:text-white font-semibold text-xs sm:text-sm tracking-wider uppercase border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <span>VER CARTELERA</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
