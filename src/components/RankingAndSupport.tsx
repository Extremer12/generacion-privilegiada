import React from 'react';
import { ArrowRight, Heart, Wifi, Video, Sparkles, Film, Award, Wrench } from 'lucide-react';
import { RANKING_2026, GP_CONFIG } from '../data/gpData';

interface RankingAndSupportProps {
  onOpenSupportModal: () => void;
  onViewFullRanking: () => void;
  onViewAllGoals: () => void;
}

export const RankingAndSupport: React.FC<RankingAndSupportProps> = ({
  onOpenSupportModal,
  onViewFullRanking,
  onViewAllGoals,
}) => {
  const { funding } = GP_CONFIG;

  const goalsList = [
    { title: "Internet", icon: Wifi },
    { title: "Equipamiento", icon: Video },
    { title: "Iluminación", icon: Sparkles },
    { title: "Producción", icon: Film },
    { title: "Premios", icon: Award },
    { title: "Mantenimiento", icon: Wrench },
  ];

  return (
    <section id="ranking" className="relative py-16 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Ranking Anual (Span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-[#0C121B]/90 border border-white/[0.08] shadow-xl">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08]">
              <h2 className="font-akira text-sm sm:text-base font-black text-[#F4F5F7] tracking-wider uppercase">
                RANKING ANUAL <span className="text-[#C9A45C]">2026</span>
              </h2>

              <button
                onClick={onViewFullRanking}
                className="group inline-flex items-center gap-1 text-[11px] font-semibold text-[#AEB6C2] hover:text-[#C9A45C] transition-colors"
              >
                <span>VER RANKING COMPLETO</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* List */}
            <div className="space-y-3">
              {RANKING_2026.map((user) => {
                const isFirst = user.rank === 1;
                return (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${
                      isFirst
                        ? 'bg-[#151F2C] border border-[#C9A45C]/30 shadow-[0_0_15px_rgba(201,164,92,0.15)]'
                        : 'bg-[#111A25]/50 hover:bg-[#111A25] border border-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank Number Badge */}
                      <span
                        className={`w-6 h-6 rounded flex items-center justify-center font-akira text-xs font-black ${
                          isFirst
                            ? 'bg-[#C9A45C] text-[#070A0F]'
                            : 'bg-white/[0.06] text-[#AEB6C2]'
                        }`}
                      >
                        {user.rank}
                      </span>

                      {/* Avatar */}
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`w-8 h-8 rounded-full object-cover border ${
                          isFirst ? 'border-[#C9A45C]' : 'border-white/10'
                        }`}
                      />

                      {/* Name */}
                      <span className={`text-xs font-semibold ${isFirst ? 'text-white' : 'text-[#AEB6C2]'}`}>
                        {user.name}
                      </span>
                    </div>

                    {/* Points */}
                    <div className="font-mono text-xs font-bold tracking-tight">
                      <span className={isFirst ? 'text-[#E4C77A]' : 'text-[#AEB6C2]'}>
                        {user.points.toLocaleString()}
                      </span>{' '}
                      <span className="text-[10px] text-[#AEB6C2]/60 uppercase font-sans">pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-[#AEB6C2]/60">
            * Puntos asignados manualmente por el equipo de GP durante las transmisiones.
          </div>
        </div>

        {/* Center Column: Apoyá Generación Privilegiada (Span 5) */}
        <div id="apoyanos" className="relative lg:col-span-5 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0C121B] shadow-2xl flex flex-col justify-between p-6 sm:p-8">
          {/* Mountain Texture Background */}
          <img
            src="/images/mountains-banner.jpg"
            alt="Apoyá GP"
            className="absolute inset-0 w-full h-full object-cover opacity-30 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/70 to-[#070A0F]/50" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="font-akira text-xl sm:text-2xl font-black text-[#F4F5F7] tracking-wider leading-tight mb-2 uppercase">
              APOYÁ<br />
              <span className="text-gold-gradient">GENERACIÓN PRIVILEGIADA</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#AEB6C2] leading-relaxed mb-6 max-w-md">
              Este proyecto se sostiene gracias a personas que creen en lo que estamos construyendo.
            </p>

            {/* Progress Bar Container */}
            <div className="bg-[#111A25]/80 backdrop-blur-md rounded-xl p-4 border border-white/[0.08] mb-6">
              <div className="flex justify-between items-baseline text-xs font-bold mb-2">
                <span className="text-white font-mono text-sm tracking-tight">
                  {funding.formattedCurrent}{' '}
                  <span className="text-[#AEB6C2]/60 text-xs font-normal">/ {funding.formattedTarget}</span>
                </span>
                <span className="text-[#C9A45C] font-mono text-sm">{funding.percentage}%</span>
              </div>

              {/* Progress bar track */}
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gold-gradient rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(201,164,92,0.5)]"
                  style={{ width: `${funding.percentage}%` }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onOpenSupportModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(201,164,92,0.3)] hover:shadow-[0_0_25px_rgba(201,164,92,0.45)]"
              >
                <Heart className="w-3.5 h-3.5 fill-[#070A0F]" />
                <span>QUIERO APOYAR</span>
              </button>

              <button
                onClick={onViewAllGoals}
                className="text-xs text-[#AEB6C2] hover:text-[#C9A45C] font-semibold transition-colors"
              >
                Ver todas las metas →
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-3 text-[11px] text-[#AEB6C2]/60">
            Transparencia total en el destino de cada aporte mensual.
          </div>
        </div>

        {/* Right Column: ¿En qué nos ayuda tu aporte? (Span 3) */}
        <div className="lg:col-span-3 flex flex-col justify-between p-6 rounded-2xl bg-[#0C121B]/90 border border-white/[0.08] shadow-xl">
          <div>
            <h3 className="font-akira text-xs font-black tracking-wider text-[#F4F5F7] uppercase mb-6 pb-3 border-b border-white/[0.08]">
              ¿EN QUÉ NOS AYUDA TU APORTE?
            </h3>

            <div className="space-y-4">
              {goalsList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5 group">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#C9A45C] group-hover:border-[#C9A45C]/50 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#F4F5F7] tracking-wide group-hover:text-[#C9A45C] transition-colors">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-white/[0.06] text-right">
            <span className="text-[11px] text-[#C9A45C] font-semibold">100% autogestionado</span>
          </div>
        </div>

      </div>
    </section>
  );
};
