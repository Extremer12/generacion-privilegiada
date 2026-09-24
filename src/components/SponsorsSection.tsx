import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Tv, Users } from 'lucide-react';

export const SponsorsSection: React.FC = () => {
  return (
    <section id="patrocinadores" className="relative py-20 sm:py-28 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.08]">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-80 bg-[#C9A45C]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Modern Compact Teaser Card */}
      <div className="relative z-10 max-w-4xl mx-auto rounded-3xl bg-[#0C121B]/95 border border-white/[0.1] p-8 sm:p-14 text-center shadow-2xl overflow-hidden backdrop-blur-xl group hover:border-[#C9A45C]/40 transition-all duration-300">
        
        {/* Subtle decorative top bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/25 text-[#C9A45C] text-[11px] font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROGRAMA DE ALIANZAS & SPONSORS</span>
        </div>

        {/* Title */}
        <h2 className="font-akira text-2xl sm:text-4xl font-black text-white uppercase tracking-wider mb-4 leading-tight">
          SUMÁ TU MARCA A<br />
          <span className="text-gold-gradient">GENERACIÓN PRIVILEGIADA</span>
        </h2>

        {/* Short & Enticing Pitch */}
        <p className="text-xs sm:text-sm text-[#AEB6C2] max-w-2xl mx-auto leading-relaxed mb-10">
          Conectá con una audiencia joven, leal y en pleno crecimiento. Presencia en la mesa del estudio, recomendaciones orgánicas de nuestros conductores e impacto multiplataforma en YouTube, TikTok e Instagram.
        </p>

        {/* 3 Quick Impact Pill Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto mb-10">
          <div className="p-3.5 rounded-2xl bg-[#111A25]/80 border border-white/[0.06] flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-[#C9A45C]/10 border border-[#C9A45C]/30 flex items-center justify-center text-[#C9A45C] flex-shrink-0">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-white block">En Vivo en YouTube</span>
              <span className="text-[10px] text-[#AEB6C2]">Producto en mesa y pantalla</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#111A25]/80 border border-white/[0.06] flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-[#C9A45C]/10 border border-[#C9A45C]/30 flex items-center justify-center text-[#C9A45C] flex-shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-white block">Mención Cercana</span>
              <span className="text-[10px] text-[#AEB6C2]">Recomendación genuina</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#111A25]/80 border border-white/[0.06] flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-[#C9A45C]/10 border border-[#C9A45C]/30 flex items-center justify-center text-[#C9A45C] flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-white block">Clips en Redes</span>
              <span className="text-[10px] text-[#AEB6C2]">TikTok, Reels e Instagram</span>
            </div>
          </div>
        </div>

        {/* CTA Button to Full Screen Page */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#/patrocinadores"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(201,164,92,0.3)] hover:shadow-[0_0_35px_rgba(201,164,92,0.5)] scale-100 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>CONOCÉ NUESTRO PROGRAMA DE SPONSORS</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="text-[11px] text-[#AEB6C2]/60 mt-4">
          Planes flexibles a medida • Formulario simple y contacto directo vía WhatsApp
        </p>

      </div>

    </section>
  );
};
