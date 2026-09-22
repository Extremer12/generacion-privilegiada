import React, { useState } from 'react';
import { X, Heart, Check, Copy } from 'lucide-react';
import { SUPPORT_GOALS } from '../data/gpData';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(5000);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const supportTiers = [
    { amount: 2500, label: '$2.500', desc: 'Comunidad' },
    { amount: 5000, label: '$5.000', desc: 'Producción' },
    { amount: 10000, label: '$10.000', desc: 'Equipamiento' },
    { amount: 20000, label: '$20.000', desc: 'Sponsor Amigo' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0C121B] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#070A0F]">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#C9A45C] fill-[#C9A45C]" />
            <h3 className="font-akira text-sm sm:text-base font-black text-white uppercase tracking-wider">
              APOYÁ GENERACIÓN PRIVILEGIADA
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/20 text-[#AEB6C2] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Transparency statement */}
          <div className="p-4 rounded-xl bg-[#111A25] border border-white/[0.06]">
            <p className="text-xs sm:text-sm text-[#AEB6C2] leading-relaxed">
              GP es un medio autogestionado. Cada aporte mensual o puntual va directamente a costear la conectividad, cámaras, luces, mantenimiento del estudio y premios para la comunidad.
            </p>
          </div>

          {/* Goal breakdown */}
          <div>
            <span className="block text-[11px] font-bold text-[#AEB6C2] uppercase tracking-wider mb-3">
              OBJETIVOS EN CURSO
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SUPPORT_GOALS.map((goal, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#111A25]/50 border border-white/[0.04]">
                  <span className="font-semibold text-xs text-white block">{goal.title}</span>
                  <span className="text-[10px] text-[#AEB6C2]/70 leading-tight block mt-0.5">{goal.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tiers */}
          <div>
            <span className="block text-[11px] font-bold text-[#AEB6C2] uppercase tracking-wider mb-2.5">
              SELECCIONAR MONTO SUGERIDO (ARS)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {supportTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => setSelectedTier(tier.amount)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedTier === tier.amount
                      ? 'border-[#C9A45C] bg-[#C9A45C]/15 text-[#E4C77A]'
                      : 'border-white/[0.08] bg-[#111A25] text-[#AEB6C2] hover:border-white/20'
                  }`}
                >
                  <span className="block font-akira text-sm font-bold">{tier.label}</span>
                  <span className="text-[10px] uppercase tracking-wider">{tier.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Bank / Payment details */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold text-[#AEB6C2] uppercase tracking-wider">
              DATOS DE TRANSFERENCIA
            </span>

            {/* Alias */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#111A25] border border-white/[0.08]">
              <div>
                <span className="text-[10px] text-[#AEB6C2] block uppercase tracking-wider">ALIAS</span>
                <span className="font-mono text-sm font-bold text-white">GP.STREAMING.OFICIAL</span>
              </div>
              <button
                onClick={() => copyToClipboard('GP.STREAMING.OFICIAL', 'alias')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-[#C9A45C] transition-colors"
              >
                {copiedField === 'alias' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'alias' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            {/* CBU */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#111A25] border border-white/[0.08]">
              <div>
                <span className="text-[10px] text-[#AEB6C2] block uppercase tracking-wider">CBU / CVU</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-white">0000003100084729104820</span>
              </div>
              <button
                onClick={() => copyToClipboard('0000003100084729104820', 'cbu')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-[#C9A45C] transition-colors"
              >
                {copiedField === 'cbu' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'cbu' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            {/* Titular */}
            <div className="p-3.5 rounded-xl bg-[#111A25] border border-white/[0.08]">
              <span className="text-[10px] text-[#AEB6C2] block uppercase tracking-wider">TITULAR</span>
              <span className="text-xs font-semibold text-white">Generación Privilegiada Producciones</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#070A0F] border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs tracking-wider uppercase transition-colors"
          >
            ENTENDIDO
          </button>
        </div>

      </div>
    </div>
  );
};
