import React, { useState } from 'react';
import { X, Heart, Check, Copy, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const { goals, funding } = useAdmin();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleMercadoPagoDonation = () => {
    const link = funding.mercadoPagoLink || 'https://link.mercadopago.com.ar/generacionprivilegiada';
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0C121B] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl my-8">
        
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
        <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
          
          {/* Transparency statement */}
          <div className="p-4 rounded-2xl bg-[#111A25] border border-white/[0.06]">
            <p className="text-xs sm:text-sm text-[#AEB6C2] leading-relaxed">
              GP es un medio 100% autogestionado. Cada aporte es <strong className="text-white">totalmente libre</strong> y va directo a costear conectividad, cámaras, sonido, mantenimiento del estudio y proyectos comunitarios.
            </p>
          </div>

          {/* Direct Bank / Wallet Transfer Box (ALIAS & CBU) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C9A45C] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>TRANSFERENCIA DIRECTA (0% COMISIONES)</span>
              </span>
              <span className="text-[10px] text-[#AEB6C2]/70 uppercase">Monto Libre</span>
            </div>

            {/* ALIAS CARD */}
            <div className="p-4 rounded-2xl bg-[#111A25] border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all group">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#AEB6C2] block uppercase tracking-wider mb-1">
                    ALIAS (MERCADO PAGO O CUALQUIER BANCO)
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#E4C77A] tracking-wide select-all">
                    {funding.alias || 'GP.STREAMING.OFICIAL'}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(funding.alias || 'GP.STREAMING.OFICIAL', 'alias')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  {copiedField === 'alias' ? <Check className="w-4 h-4 text-[#070A0F]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedField === 'alias' ? 'Copiado' : 'Copiar Alias'}</span>
                </button>
              </div>
            </div>

            {/* CBU / CVU CARD */}
            <div className="p-4 rounded-2xl bg-[#111A25] border border-white/[0.08] hover:border-white/20 transition-all">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#AEB6C2] block uppercase tracking-wider mb-1">
                    CBU / CVU
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-white tracking-wider select-all">
                    {funding.cbu || '0000003100084729104820'}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(funding.cbu || '0000003100084729104820', 'cbu')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold text-xs transition-all active:scale-95"
                >
                  {copiedField === 'cbu' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'cbu' ? 'Copiado' : 'Copiar CBU'}</span>
                </button>
              </div>
            </div>

            {/* Titular */}
            <div className="p-3.5 rounded-xl bg-[#0E1622] border border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] text-[#AEB6C2] uppercase tracking-wider">TITULAR DE LA CUENTA</span>
              <span className="text-xs font-bold text-white">{funding.holderName || 'Generación Privilegiada'}</span>
            </div>
          </div>

          {/* Optional Mercado Pago Link (if configured) */}
          {funding.mercadoPagoLink && (
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="p-4 rounded-2xl bg-[#009EE3]/10 border border-[#009EE3]/25 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">¿Preferís link de Mercado Pago?</span>
                  <span className="text-[11px] text-[#AEB6C2]">Podés donar con tarjeta o saldo abierto</span>
                </div>
                <button
                  onClick={handleMercadoPagoDonation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#009EE3] hover:bg-[#0089c7] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Abrir Mercado Pago</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Goals Breakdown */}
          {goals && goals.length > 0 && (
            <div className="pt-2">
              <span className="block text-[11px] font-bold text-[#AEB6C2] uppercase tracking-wider mb-2.5">
                EN QUÉ SE INVIERTEN LAS DONACIONES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {goals.map((goal, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#111A25]/50 border border-white/[0.04]">
                    <span className="font-semibold text-xs text-white block">{goal.title}</span>
                    <span className="text-[10px] text-[#AEB6C2]/70 leading-tight block mt-0.5">{goal.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#070A0F] border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-[#AEB6C2]/70">
            ¡Muchas gracias por bendecir e impulsar a GP!
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs tracking-wider uppercase transition-colors"
          >
            CERRAR
          </button>
        </div>

      </div>
    </div>
  );
};
