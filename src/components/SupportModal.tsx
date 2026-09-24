import React, { useState } from 'react';
import { X, Heart, Check, Copy, ArrowRight, Smartphone } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const { goals, funding } = useAdmin();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(5000);
  const [activeTab, setActiveTab] = useState<'mercadopago' | 'transferencia'>('mercadopago');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const supportTiers = [
    { amount: 1500, label: '$1.500', desc: 'Comunidad' },
    { amount: 3000, label: '$3.000', desc: 'Producción' },
    { amount: 5000, label: '$5.000', desc: 'Equipamiento', popular: true },
    { amount: 10000, label: '$10.000', desc: 'Sponsor Amigo' },
  ];

  const handleMercadoPagoDonation = () => {
    const link = funding.mercadoPagoLink || 'https://link.mercadopago.com.ar/generacionprivilegiada';
    window.open(link, '_blank', 'noopener,noreferrer');
  };

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
        <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
          
          {/* Transparency statement */}
          <div className="p-4 rounded-xl bg-[#111A25] border border-white/[0.06]">
            <p className="text-xs sm:text-sm text-[#AEB6C2] leading-relaxed">
              GP es un medio 100% autogestionado. Cada aporte mensual o puntual va directamente a costear conectividad de alta velocidad, cámaras, luces, sonido, mantenimiento del estudio y eventos comunitarios.
            </p>
          </div>

          {/* Goals Breakdown */}
          <div>
            <span className="block text-[11px] font-bold text-[#AEB6C2] uppercase tracking-wider mb-2.5">
              METAS PRIORITARIAS EN CURSO
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {goals.map((goal, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#111A25]/50 border border-white/[0.04]">
                  <span className="font-semibold text-xs text-white block">{goal.title}</span>
                  <span className="text-[10px] text-[#AEB6C2]/70 leading-tight block mt-0.5">{goal.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amount Selection */}
          <div>
            <span className="block text-[11px] font-bold text-[#AEB6C2] uppercase tracking-wider mb-2.5">
              SELECCIONAR MONTO SUGERIDO (ARS)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {supportTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => setSelectedTier(tier.amount)}
                  className={`p-3 rounded-xl border text-center transition-all relative ${
                    selectedTier === tier.amount
                      ? 'border-[#C9A45C] bg-[#C9A45C]/15 text-[#E4C77A] shadow-[0_0_15px_rgba(201,164,92,0.2)]'
                      : 'border-white/[0.08] bg-[#111A25] text-[#AEB6C2] hover:border-white/20'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-full bg-[#C9A45C] text-[#070A0F] text-[8px] font-black uppercase">
                      Popular
                    </span>
                  )}
                  <span className="block font-akira text-sm font-bold">{tier.label}</span>
                  <span className="text-[10px] uppercase tracking-wider">{tier.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="pt-2">
            <div className="flex border-b border-white/[0.08] mb-4 gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('mercadopago')}
                className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all relative ${
                  activeTab === 'mercadopago'
                    ? 'text-[#009EE3] border-b-2 border-[#009EE3]'
                    : 'text-[#AEB6C2] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>MERCADO PAGO (1 CLIC)</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('transferencia')}
                className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all relative ${
                  activeTab === 'transferencia'
                    ? 'text-[#C9A45C] border-b-2 border-[#C9A45C]'
                    : 'text-[#AEB6C2] hover:text-white'
                }`}
              >
                <span>TRANSFERENCIA (ALIAS / CBU)</span>
              </button>
            </div>

            {/* TAB 1: MERCADO PAGO */}
            {activeTab === 'mercadopago' && (
              <div className="space-y-4 p-5 rounded-2xl bg-[#009EE3]/10 border border-[#009EE3]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#009EE3] flex items-center justify-center text-white font-black text-sm">
                      MP
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Donación directa por Mercado Pago</h4>
                      <p className="text-xs text-[#AEB6C2]">
                        Aboná con saldo en cuenta, tarjeta de débito o crédito al instante sin copiar datos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleMercadoPagoDonation}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#009EE3] hover:bg-[#0089c7] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,158,227,0.35)] hover:shadow-[0_0_25px_rgba(0,158,227,0.5)]"
                  >
                    <span>DONAR {selectedTier ? `$${selectedTier.toLocaleString('es-AR')}` : ''} CON MERCADO PAGO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="block text-center text-[11px] text-[#AEB6C2]/60 mt-2">
                    Abre de forma segura la pasarela oficial de Mercado Pago
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: TRANSFERENCIA BANCARIA */}
            {activeTab === 'transferencia' && (
              <div className="space-y-3">
                {/* Alias */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#111A25] border border-white/[0.08]">
                  <div>
                    <span className="text-[10px] text-[#AEB6C2] block uppercase tracking-wider">ALIAS</span>
                    <span className="font-mono text-sm font-bold text-white">{funding.alias || 'GP.STREAMING.OFICIAL'}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(funding.alias || 'GP.STREAMING.OFICIAL', 'alias')}
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
                    <span className="font-mono text-xs sm:text-sm font-bold text-white">{funding.cbu || '0000003100084729104820'}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(funding.cbu || '0000003100084729104820', 'cbu')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-[#C9A45C] transition-colors"
                  >
                    {copiedField === 'cbu' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'cbu' ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>

                {/* Titular */}
                <div className="p-3.5 rounded-xl bg-[#111A25] border border-white/[0.08]">
                  <span className="text-[10px] text-[#AEB6C2] block uppercase tracking-wider">TITULAR</span>
                  <span className="text-xs font-semibold text-white">{funding.holderName || 'Generación Privilegiada Producciones'}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#070A0F] border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-[#AEB6C2]/60 hidden sm:inline">
            ¡Muchas gracias por impulsar a GP!
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
