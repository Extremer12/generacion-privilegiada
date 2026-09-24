import React from 'react';
import { Sparkles, TrendingUp, Users, Tv, CheckCircle2, ArrowRight } from 'lucide-react';

export const SponsorsSection: React.FC = () => {
  const benefits = [
    {
      icon: Tv,
      title: "Presencia en el Estudio y Pantalla",
      desc: "Zócalos dinámicos en vivo, logo permanente en cortes clave y colocación de producto real en la mesa de transmisión.",
    },
    {
      icon: Users,
      title: "Menciones Orgánicas y Creíbles",
      desc: "Nuestros conductores recomiendan tu marca de forma natural y cercana, generando confianza real en la comunidad.",
    },
    {
      icon: TrendingUp,
      title: "Impacto Multiplataforma",
      desc: "Tu marca llega a través de transmisiones en YouTube, clips virales en TikTok y reels en Instagram con links directos.",
    },
    {
      icon: Sparkles,
      title: "Segmentos y Juegos a Medida",
      desc: "Sponsoreá momentos icónicos del programa como trivias comunitarias, desafíos en vivo y espacios temáticos.",
    },
  ];

  const tiers = [
    {
      name: "SPONSOR SEGMENTO",
      tag: "Ideal para iniciar",
      desc: "Presencia y mención en un bloque temático específico durante la transmisión semanal.",
      features: [
        "Mención verbal del conductor en el bloque",
        "Zócalo visual con logo y redes de tu marca",
        "Enlace fijado en chat en vivo y descripción",
      ],
    },
    {
      name: "SPONSOR OFICIAL",
      tag: "Más Elegido",
      popular: true,
      desc: "Exposición integral a lo largo de toda la transmisión y en contenidos derivados.",
      features: [
        "Múltiples menciones durante el programa",
        "Banner digital en pantalla y producto en mesa",
        "Presencia en clips destacados para TikTok e Instagram",
        "Sorteos y activaciones con la audiencia",
      ],
    },
    {
      name: "PARTNER ESTRATÉGICO",
      tag: "Alianza 360°",
      desc: "Integración de marca profunda, co-creación de experiencias y presencia institucional destacada.",
      features: [
        "Branding principal en el set y transmisiones",
        "Espacio exclusivo en la web oficial de GP",
        "Cápsulas de contenido y cobertura en eventos",
        "Atención comercial y reportes de alcance mensuales",
      ],
    },
  ];

  return (
    <section id="patrocinadores" className="relative py-24 sm:py-32 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.08]">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#C9A45C]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <span className="text-xs font-semibold tracking-[0.25em] text-[#C9A45C] uppercase block mb-3">
          ALIANZAS ESTRATÉGICAS
        </span>
        <h2 className="font-akira text-2xl sm:text-4xl font-black text-[#F4F5F7] tracking-wider uppercase mb-5 leading-tight">
          SUMÁ TU MARCA A<br />
          <span className="text-gold-gradient">GENERACIÓN PRIVILEGIADA</span>
        </h2>
        <p className="text-sm sm:text-base text-[#AEB6C2] leading-relaxed">
          Conectá con una audiencia joven, leal y comprometida que valora la autenticidad, la creatividad y el propósito. Diseñamos alianzas comerciales con valor genuino.
        </p>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 relative z-10">
        {[
          { metric: "+15K", label: "Visualizaciones mensuales", sub: "Streams y repeticiones" },
          { metric: "85%", label: "Audiencia de 18 a 34 años", sub: "Jóvenes y adultos jóvenes" },
          { metric: "+45m", label: "Tiempo de permanencia", sub: "Alta retención en vivo" },
          { metric: "100%", label: "Orgánico y comunitario", sub: "Fidelidad de audiencia" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0C121B]/90 border border-white/[0.06] text-center shadow-lg"
          >
            <span className="font-akira text-2xl sm:text-3xl font-black text-gold-gradient block mb-1">
              {item.metric}
            </span>
            <span className="font-semibold text-xs text-[#F4F5F7] block mb-0.5">
              {item.label}
            </span>
            <span className="text-[11px] text-[#AEB6C2]/60 block">
              {item.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Value Proposition & Benefits */}
      <div className="mb-20 relative z-10">
        <div className="text-center mb-10">
          <h3 className="font-akira text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
            ¿POR QUÉ ANUNCIAR EN GP?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0C121B]/90 border border-white/[0.08] hover:border-[#C9A45C]/40 transition-all duration-300 flex flex-col justify-between shadow-md group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] group-hover:border-[#C9A45C]/50 flex items-center justify-center text-[#C9A45C] mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-akira text-xs font-bold text-white uppercase tracking-wide mb-2">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#AEB6C2] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sponsorship Modalities Cards */}
      <div className="mb-16 relative z-10">
        <div className="text-center mb-10">
          <h3 className="font-akira text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
            MODALIDADES DE PATROCINIO
          </h3>
          <p className="text-xs text-[#AEB6C2] mt-1">
            Planes flexibles adaptados a los objetivos y escala de tu marca.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? 'bg-[#111A25] border-2 border-[#C9A45C]/60 shadow-[0_0_30px_rgba(201,164,92,0.15)]'
                  : 'bg-[#0C121B] border border-white/[0.08]'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#C9A45C] text-[#070A0F] font-akira text-[10px] font-black uppercase tracking-wider shadow-md">
                  RECOMENDADO
                </div>
              )}

              <div>
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-[#C9A45C] tracking-widest uppercase block mb-1">
                    {tier.tag}
                  </span>
                  <h4 className="font-akira text-base font-black text-white uppercase tracking-wider">
                    {tier.name}
                  </h4>
                  <p className="text-xs text-[#AEB6C2] mt-2 leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#F4F5F7]">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06]">
                <a
                  href="#/patrocinadores"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                    tier.popular
                      ? 'bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F]'
                      : 'bg-white/[0.06] hover:bg-white/15 text-white'
                  }`}
                >
                  <span>Solicitar Propuesta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Portal Banner Callout */}
      <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-[#111A25] to-[#0C121B] border border-[#C9A45C]/30 p-8 sm:p-12 text-center shadow-2xl relative z-10">
        <span className="text-xs font-semibold tracking-[0.25em] text-[#C9A45C] uppercase block mb-3">
          ESPACIO DEDICADO A PANTALLA COMPLETA
        </span>
        <h3 className="font-akira text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-3">
          ¿QUERÉS ANUNCIAR EN GP?
        </h3>
        <p className="text-xs sm:text-sm text-[#AEB6C2] max-w-xl mx-auto mb-8 leading-relaxed">
          Accedé a nuestro portal exclusivo para sponsors. Una experiencia simple, clara y directa para coordinar tu presencia en vivo y en redes sin vueltas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#/patrocinadores"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(201,164,92,0.3)] hover:shadow-[0_0_35px_rgba(201,164,92,0.5)]"
          >
            <span>INGRESAR AL PORTAL DE PATROCINADORES</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </section>
  );
};
