import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Tv,
  Users,
  TrendingUp,
  Heart,
  CheckCircle2,
  Send,
  MessageCircle,
  ShieldCheck,
  Check,
  Building2,
  Phone,
  Mail
} from 'lucide-react';
import { GpLogo } from '../GpLogo';

interface SponsorsPageProps {
  onBackToSite: () => void;
}

export const SponsorsPage: React.FC<SponsorsPageProps> = ({ onBackToSite }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [selectedPlan, setSelectedPlan] = useState<string>('oficial');
  const [formData, setFormData] = useState({
    empresa: '',
    contacto: '',
    whatsapp: '',
    email: '',
    rubro: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const plans = [
    {
      id: 'segmento',
      name: 'Mención en Bloque',
      badge: 'Básico',
      highlight: false,
      desc: 'Mención del conductor y logo en pantalla durante un segmento temático específico del programa.',
      points: [
        'Mención verbal del conductor en vivo',
        'Zócalo en pantalla con logo y redes',
        'Link fijado en chat de YouTube'
      ]
    },
    {
      id: 'oficial',
      name: 'Sponsor Oficial',
      badge: 'Más Elegido',
      highlight: true,
      desc: 'Presencia constante en el estudio, producto en la mesa principal y menciones a lo largo de toda la emisión.',
      points: [
        'Colocación de tu producto en la mesa',
        'Múltiples menciones en vivo',
        'Presencia en clips para TikTok e Instagram',
        'Banner digital y zócalos rotativos'
      ]
    },
    {
      id: 'partner',
      name: 'Partner 360°',
      badge: 'Alianza Total',
      highlight: false,
      desc: 'Integración integral y personalizada: juegos de marca, sorteos con la comunidad y presencia en todas las redes.',
      points: [
        'Branding destacado en estudio y streaming',
        'Sorteos y activaciones exclusivas',
        'Contenido co-creado con los conductores',
        'Espacio dedicado en la web oficial'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.empresa.trim() || (!formData.whatsapp.trim() && !formData.email.trim())) return;
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hola equipo de Generación Privilegiada! Nos interesa sumar nuestra marca/empresa (${formData.empresa || 'Empresa'}) como Sponsor en el plan ${selectedPlan.toUpperCase()}. ¿Podemos coordinar una propuesta?`
    );
    return `https://wa.me/5492644774742?text=${text}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#070A0F] text-[#F4F5F7] font-sans antialiased overflow-x-hidden relative selection:bg-[#C9A45C] selection:text-[#070A0F]">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[#C9A45C]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[450px] h-[450px] bg-[#C9A45C]/3 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0A0E15]/90 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <GpLogo size="sm" showText={true} />
            <div className="hidden sm:block h-5 w-px bg-white/10" />
            <span className="hidden sm:inline-block text-xs font-semibold text-[#AEB6C2]">
              Espacio Comercial & Patrocinios
            </span>
          </div>

          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-white tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A45C]" />
            <span>VOLVER AL SITIO</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#C9A45C] text-xs font-bold uppercase tracking-widest mb-6">
            <span>ALIANZAS COMERCIALES GP</span>
          </div>
          
          <h1 className="font-akira text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-6 leading-tight">
            POTENCIÁ TU MARCA EN<br />
            <span className="text-gold-gradient">GENERACIÓN PRIVILEGIADA</span>
          </h1>

          <p className="text-sm sm:text-base text-[#AEB6C2] leading-relaxed max-w-2xl mx-auto">
            Llegá directamente a miles de jóvenes y familias que siguen cada semana nuestras transmisiones. Sin rodeos, con visibilidad real, recomendaciones auténticas e impacto en redes.
          </p>
        </div>

        {/* 4 Impact Pillars - Clear & Straightforward */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {[
            {
              icon: Tv,
              title: "Presencia en Vivo",
              desc: "Tu producto en la mesa y logo en pantalla durante toda la transmisión por YouTube.",
            },
            {
              icon: Users,
              title: "Mención Cercana",
              desc: "Cristian y el equipo recomiendan tu producto de forma natural, creíble y sin caretas.",
            },
            {
              icon: TrendingUp,
              title: "Clips en Redes",
              desc: "Tu marca presente en los reels de Instagram y TikTok con links directos a tu negocio.",
            },
            {
              icon: Heart,
              title: "Comunidad Fiel",
              desc: "Una audiencia activa y comprometida que valora y apoya a las marcas que acompañan al programa.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0C121B] border border-white/[0.08] hover:border-[#C9A45C]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C9A45C]/10 border border-[#C9A45C]/30 flex items-center justify-center text-[#C9A45C] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-akira text-sm font-bold text-white uppercase tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#AEB6C2] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Clear Modalities */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-akira text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mb-2">
              PLANES & MODALIDADES
            </h2>
            <p className="text-xs sm:text-sm text-[#AEB6C2]">
              Elegí el formato que mejor se adapta al objetivo de tu marca.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((p) => {
              const isSelected = selectedPlan === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`cursor-pointer rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-[#111A25] border-2 border-[#C9A45C] shadow-[0_0_35px_rgba(201,164,92,0.2)] scale-[1.02]'
                      : 'bg-[#0C121B] border border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {p.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#C9A45C] text-[#070A0F] font-akira text-[10px] font-black uppercase tracking-wider">
                      {p.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#C9A45C] uppercase tracking-widest">
                        {p.badge}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#C9A45C] bg-[#C9A45C] text-[#070A0F]' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    <h3 className="font-akira text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#AEB6C2] leading-relaxed mb-6">
                      {p.desc}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                      {p.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#F4F5F7]">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.06]">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                        isSelected
                          ? 'bg-[#C9A45C] text-[#070A0F]'
                          : 'bg-white/[0.06] text-white hover:bg-white/[0.12]'
                      }`}
                    >
                      {isSelected ? 'Seleccionado' : 'Seleccionar este plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Form - Full-screen width, Simple & Frictionless */}
        <div id="contacto-sponsor" className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-[#0C121B] border border-white/[0.1] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            <div className="text-center mb-8">
              <span className="text-[10px] font-bold text-[#C9A45C] tracking-[0.25em] uppercase block mb-1">
                CONTACTO DIRECTO & RÁPIDO
              </span>
              <h2 className="font-akira text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-2">
                SUMÁ TU MARCA AHORA
              </h2>
              <p className="text-xs sm:text-sm text-[#AEB6C2]">
                Dejanos tus datos y coordinamos una propuesta a medida sin vueltas.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#111A25] border border-[#C9A45C]/40 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C9A45C]/15 border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] mx-auto mb-2">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-akira text-base font-bold text-white uppercase">
                  ¡SOLICITUD ENVIADA CON ÉXITO!
                </h3>
                <p className="text-xs text-[#AEB6C2] max-w-md mx-auto leading-relaxed">
                  Gracias por tu interés en <strong>{formData.empresa}</strong>. Nuestro equipo de producción se pondrá en contacto a la brevedad.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Abrir Chat de WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ empresa: '', contacto: '', whatsapp: '', email: '', rubro: '', mensaje: '' });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-white uppercase tracking-wider transition-colors"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Selector visual rápido de modalidad */}
                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-2">
                    Modalidad elegida:
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {plans.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlan(p.id)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center border ${
                          selectedPlan === p.id
                            ? 'bg-[#C9A45C] text-[#070A0F] border-[#C9A45C] shadow-md'
                            : 'bg-[#111A25] text-[#AEB6C2] border-white/[0.08] hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">
                      Empresa o Marca *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder="Ej. Mi Marca / Negocio"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C]"
                      />
                      <Building2 className="w-4 h-4 text-[#AEB6C2]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">
                      Tu Nombre / Contacto
                    </label>
                    <input
                      type="text"
                      value={formData.contacto}
                      onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                      placeholder="Ej. Lucas Gómez"
                      className="w-full px-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">
                      WhatsApp / Teléfono *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+54 9 11 1234-5678"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C]"
                      />
                      <Phone className="w-4 h-4 text-[#AEB6C2]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">
                      Email Corporativo (Opcional)
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contacto@marca.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C]"
                      />
                      <Mail className="w-4 h-4 text-[#AEB6C2]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#AEB6C2] uppercase mb-1.5">
                    ¿Qué productos o servicios ofrece tu marca? (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Contanos brevemente qué comercializan o qué propuesta tienen en mente..."
                    className="w-full px-4 py-3 rounded-xl bg-[#070A0F] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A45C] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(201,164,92,0.3)] hover:shadow-[0_0_30px_rgba(201,164,92,0.45)]"
                  >
                    <Send className="w-4 h-4" />
                    <span>ENVIAR SOLICITUD DE SPONSOR</span>
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    title="Chatear directo"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat WhatsApp</span>
                  </a>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>

      {/* Footer bar */}
      <footer className="border-t border-white/[0.08] bg-[#0A0E15] py-8 text-center text-xs text-[#AEB6C2]/60">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <GpLogo size="sm" showText={true} />
          <p>© {new Date().getFullYear()} Generación Privilegiada • Alianzas y Patrocinios Oficiales</p>
          <button
            onClick={onBackToSite}
            className="text-xs text-[#C9A45C] hover:underline uppercase font-bold"
          >
            Volver a la Web
          </button>
        </div>
      </footer>

    </div>
  );
};
