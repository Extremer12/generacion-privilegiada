import React from 'react';
import { GpLogo } from './GpLogo';
import { GP_CONFIG } from '../data/gpData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070A0F] py-12 mt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
          
          {/* Logo GP Left */}
          <div className="flex items-center">
            <GpLogo size="sm" showText={true} />
          </div>

          {/* Slogan Center */}
          <div className="text-center">
            <p className="font-sans font-bold text-xs tracking-[0.2em] text-[#AEB6C2] uppercase">
              {GP_CONFIG.slogan}
            </p>
          </div>

          {/* Socials & Terms Right */}
          <div className="flex flex-col md:items-end gap-3 text-center md:text-right">
            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-end gap-4 text-[#AEB6C2]">
              {/* YouTube */}
              <a href="https://www.youtube.com/@GeneracionPrivilegiada" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[#C9A45C] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/generacionprivilegiada1" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#C9A45C] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@generacionprivilegiada" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-[#C9A45C] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.33a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
                </svg>
              </a>
            </div>

            {/* Legal */}
            <div className="flex items-center gap-4 text-[11px] text-[#AEB6C2]/70">
              <a href="#terminos" className="hover:text-white transition-colors">Términos y condiciones</a>
              <span>|</span>
              <a href="#privacidad" className="hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#AEB6C2]/50 gap-4">
          <p>© {new Date().getFullYear()} Generación Privilegiada. Todos los derechos reservados.</p>
          
          <p className="flex items-center gap-1.5">
            <span>Diseño oficial y transmisión digital</span>
            <span className="w-1 h-1 rounded-full bg-[#C9A45C]" />
            <span>Buenos Aires</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
