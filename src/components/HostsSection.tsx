import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { GpLogo } from './GpLogo';

interface HostsSectionProps {
  onViewAll?: () => void;
}

export const HostsSection: React.FC<HostsSectionProps> = ({ onViewAll }) => {
  const { hosts } = useAdmin();
  return (
    <section id="conductores" className="reveal-on-scroll relative py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-akira text-xl sm:text-2xl font-black tracking-wider text-[#F4F5F7] uppercase">
          CONOCÉ AL EQUIPO
        </h2>

        <button
          onClick={onViewAll}
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#AEB6C2] hover:text-[#C9A45C] tracking-wider transition-colors uppercase"
        >
          <span>VER TODOS</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* 5-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        
        {/* Host Cards */}
        {hosts.map((host) => (
          <div
            key={host.id}
            className="group relative rounded-2xl overflow-hidden aspect-[3/4.2] border border-white/[0.08] hover:border-[#C9A45C]/40 transition-all duration-500 bg-[#0C121B] shadow-xl flex flex-col justify-end p-5"
          >
            {/* Host Portrait Background Image */}
            <img
              src={host.image}
              alt={host.name}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#070A0F]/60" />

            {/* Text & Social Content */}
            <div className="relative z-10">
              <h3 className="font-akira text-base sm:text-lg font-black tracking-wider text-[#F4F5F7] group-hover:text-gold-gradient transition-colors mb-0.5">
                {host.name}
              </h3>
              <p className="text-[11px] font-bold text-[#AEB6C2] tracking-[0.2em] uppercase mb-3.5">
                {host.role}
              </p>

              {/* Social Channels & Action Pill */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                {/* Instagram */}
                <a
                  href={host.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${host.name} en Instagram`}
                  className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-[#C9A45C] text-[#AEB6C2] hover:text-[#070A0F] flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href={host.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${host.name} en TikTok`}
                  className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-[#C9A45C] text-[#AEB6C2] hover:text-[#070A0F] flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.33a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={host.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${host.name} en YouTube`}
                  className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-[#C9A45C] text-[#AEB6C2] hover:text-[#070A0F] flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Profile Arrow Action */}
                <button
                  aria-label={`Ver perfil de ${host.name}`}
                  className="w-7 h-7 rounded-full border border-white/20 hover:border-[#C9A45C] text-white hover:text-[#C9A45C] ml-auto flex items-center justify-center transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 5th Card: Brand Manifesto Card with Mountains Texture */}
        <div className="relative rounded-2xl overflow-hidden aspect-[3/4.2] border border-white/[0.08] bg-[#0C121B] shadow-xl flex flex-col items-center justify-center text-center p-6 sm:col-span-2 lg:col-span-1">
          <img
            src="/images/mountains-banner.jpg"
            alt="Misión Generación Privilegiada"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/80 to-[#070A0F]/60" />

          {/* Logo GP Central */}
          <div className="relative z-10 flex flex-col items-center">
            <GpLogo size="lg" showText={false} className="mb-4" />
            <h4 className="font-akira text-xs sm:text-sm font-bold tracking-widest text-[#F4F5F7] uppercase mb-1">
              UNA GENERACIÓN.
            </h4>
            <h4 className="font-akira text-xs sm:text-sm font-bold tracking-widest text-gold-gradient uppercase mb-1">
              UNA COMUNIDAD.
            </h4>
            <h4 className="font-akira text-xs sm:text-sm font-bold tracking-widest text-[#F4F5F7] uppercase">
              UNA MISIÓN.
            </h4>
          </div>
        </div>

      </div>
    </section>
  );
};
