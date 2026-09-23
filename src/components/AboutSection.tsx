import React from 'react';
import { GpLogo } from './GpLogo';
import { useAdmin } from '../context/AdminContext';

export const AboutSection: React.FC = () => {
  const { about } = useAdmin();

  return (
    <section id="nosotros" className="relative py-20 sm:py-28 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative subtle line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Manifesto */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C9A45C] uppercase mb-3">
            {about.badge}
          </span>
          <h2 className="font-akira text-2xl sm:text-4xl font-black text-[#F4F5F7] tracking-tight uppercase leading-none mb-6">
            {about.manifestoTitle1}
            <span className="block text-gold-gradient mt-1">{about.manifestoTitle2}</span>
          </h2>
          <p className="font-akira text-xs tracking-widest text-[#AEB6C2] uppercase mb-6">
            {about.manifestoSubtitle}
          </p>
          <div className="p-4 rounded-xl border border-white/[0.06] bg-[#0C121B] flex items-center gap-4">
            <GpLogo size="sm" showText={false} />
            <p className="text-xs text-[#AEB6C2] leading-relaxed">
              {about.manifestoDescription}
            </p>
          </div>
        </div>

        {/* Right Story & Pillars */}
        <div className="lg:col-span-7 space-y-6 text-sm text-[#AEB6C2] leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#0C121B]/80 border border-white/[0.06]">
            <h3 className="font-akira text-sm font-bold text-white uppercase tracking-wider mb-2">
              {about.storyTitle}
            </h3>
            <p>
              {about.storyDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#111A25]/60 border border-white/[0.04]">
              <span className="font-akira text-xs text-[#C9A45C] block mb-1.5 uppercase">
                {about.pillar1Title}
              </span>
              <p className="text-xs text-[#AEB6C2]">
                {about.pillar1Desc}
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#111A25]/60 border border-white/[0.04]">
              <span className="font-akira text-xs text-[#C9A45C] block mb-1.5 uppercase">
                {about.pillar2Title}
              </span>
              <p className="text-xs text-[#AEB6C2]">
                {about.pillar2Desc}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
