import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [category, setCategory] = useState<'oracion' | 'contenido' | 'patrocinio' | 'otro'>('oracion');
  const [isConfidential, setIsConfidential] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) return;
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="relative py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto rounded-3xl bg-[#0C121B] border border-white/[0.08] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
            CONECTEMOS
          </span>
          <h2 className="font-akira text-xl sm:text-3xl font-black text-[#F4F5F7] tracking-wider uppercase mb-3">
            CONTACTO
          </h2>
          <p className="text-xs sm:text-sm text-[#AEB6C2] max-w-md mx-auto">
            Dejanos tu mensaje, consulta, propuesta o motivo de oración. Nuestro equipo lee cada mensaje.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-[#111A25] border border-[#C9A45C]/30 text-center relative z-10">
            <CheckCircle2 className="w-12 h-12 text-[#C9A45C] mx-auto mb-3" />
            <h3 className="font-akira text-base font-bold text-white mb-2 uppercase">
              MENSAJE RECIBIDO
            </h3>
            <p className="text-xs text-[#AEB6C2] mb-6">
              Gracias por escribirnos. Nos pondremos en contacto a la brevedad con vos.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ nombre: '', email: '', mensaje: '' });
              }}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white uppercase tracking-wider transition-colors"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            
            {/* Category Pills */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-[#AEB6C2] uppercase mb-2">
                TIPO DE MENSAJE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'oracion', label: 'PEDIDO DE ORACIÓN' },
                  { id: 'contenido', label: 'PROPUESTA' },
                  { id: 'patrocinio', label: 'PATROCINADORES' },
                  { id: 'otro', label: 'OTRO' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-center text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
                      category === item.id
                        ? 'bg-[#C9A45C] text-[#070A0F] border-[#C9A45C] shadow-md font-bold'
                        : 'bg-[#111A25] text-[#AEB6C2] border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#AEB6C2] uppercase mb-1.5">
                  NOMBRE
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#111A25] border border-white/[0.08] focus:border-[#C9A45C] focus:outline-none text-sm text-white placeholder-[#AEB6C2]/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#AEB6C2] uppercase mb-1.5">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="tuemail@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#111A25] border border-white/[0.08] focus:border-[#C9A45C] focus:outline-none text-sm text-white placeholder-[#AEB6C2]/40 transition-colors"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-[#AEB6C2] uppercase mb-1.5">
                MENSAJE
              </label>
              <textarea
                required
                rows={4}
                placeholder="Escribí acá tu mensaje o motivo..."
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#111A25] border border-white/[0.08] focus:border-[#C9A45C] focus:outline-none text-sm text-white placeholder-[#AEB6C2]/40 transition-colors resize-none"
              />
            </div>

            {/* If Prayer Request: Confidential Checkbox */}
            {category === 'oracion' && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111A25]/60 border border-white/[0.06]">
                <input
                  type="checkbox"
                  id="confidential-check"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C9A45C] focus:ring-[#C9A45C] bg-[#070A0F] border-white/20"
                />
                <label htmlFor="confidential-check" className="flex items-center gap-2 text-xs text-[#AEB6C2] cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Tratar este motivo como <strong>CONFIDENCIAL</strong> (no compartir públicamente en stream).</span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(201,164,92,0.25)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ENVIAR MENSAJE</span>
            </button>

          </form>
        )}

      </div>
    </section>
  );
};
