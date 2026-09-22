import React from 'react';
import { X, Calendar, Play } from 'lucide-react';
import { HOSTS } from '../data/gpData';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchLive: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onWatchLive,
}) => {
  if (!isOpen) return null;

  const shows = [
    {
      title: "CON MATE Y BIBLIA",
      day: "SÁBADOS",
      time: "19:30 HS",
      tag: "STREAMING EN VIVO",
      description: "Transmisión principal semanal con Cristian Bordón, Victoria Medawar y equipo. Conversaciones profundas, fe, historias reales y comunidad sin formalismos.",
      hosts: [HOSTS[0], HOSTS[1]],
      image: "https://i.ytimg.com/vi/zwkn7POAC-Y/hqdefault.jpg",
      isLiveSoon: true,
    },
    {
      title: "TESTIMONIOS DE VIDA",
      day: "EDICIÓN MENSUAL",
      time: "20:00 HS",
      tag: "HISTORIAS REALES",
      description: "Historias impactantes de transformación y superación en primera persona, testimonios de fe y restauración.",
      hosts: [HOSTS[0], HOSTS[2]],
      image: "https://i.ytimg.com/vi/8KInRU9Yz8M/hqdefault.jpg",
    },
    {
      title: "PROGRAMAS ESPECIALES GP",
      day: "SÁBADOS ESPECIALES",
      time: "19:30 HS",
      tag: "DEBATE Y REFLEXIÓN",
      description: "Ediciones temáticas sobre la autenticidad, la fe juvenil contemporánea y reflexiones que confrontan la cultura.",
      hosts: [HOSTS[1], HOSTS[3]],
      image: "https://i.ytimg.com/vi/TJhxlEbktCI/hqdefault.jpg",
    },
    {
      title: "HUMILDAD Y SERVICIO",
      day: "EDICIÓN ESPECIAL",
      time: "21:00 HS",
      tag: "LIDERAZGO Y COMUNIDAD",
      description: "Espacio dedicado a profundizar en valores de servicio, empatía comunitaria y propósito espiritual en la vida diaria.",
      hosts: [HOSTS[0], HOSTS[1]],
      image: "https://i.ytimg.com/vi/qhDp7PPQDeM/hqdefault.jpg",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0C121B] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#070A0F]">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#C9A45C]" />
            <h3 className="font-akira text-sm sm:text-base font-black text-white uppercase tracking-wider">
              CARTELERA & PROGRAMACIÓN OFICIAL
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/20 text-[#AEB6C2] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shows list */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {shows.map((show, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#111A25]/70 border border-white/[0.06] hover:border-[#C9A45C]/40 transition-colors flex flex-col md:flex-row gap-5 items-stretch"
            >
              {/* Thumbnail */}
              <div className="md:w-56 h-36 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/10">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-[#C9A45C] border border-[#C9A45C]/30">
                  {show.tag}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-akira text-xs text-[#C9A45C] bg-[#C9A45C]/10 px-2 py-0.5 rounded font-bold">
                      {show.day} • {show.time}
                    </span>
                    {show.isLiveSoon && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E53935] text-white">
                        PRÓXIMO EN VIVO
                      </span>
                    )}
                  </div>

                  <h4 className="font-akira text-sm sm:text-base font-bold text-white mb-2">
                    {show.title}
                  </h4>

                  <p className="text-xs text-[#AEB6C2] leading-relaxed mb-3">
                    {show.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#AEB6C2]/70">Conductores:</span>
                    <div className="flex items-center -space-x-1.5">
                      {show.hosts.map((h) => (
                        <img
                          key={h.id}
                          src={h.image}
                          alt={h.name}
                          title={h.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#111A25]"
                        />
                      ))}
                    </div>
                  </div>

                  {show.isLiveSoon && (
                    <button
                      onClick={() => {
                        onClose();
                        onWatchLive();
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A45C] text-[#070A0F] font-bold text-[11px] uppercase tracking-wider hover:bg-[#E4C77A] transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Sintonizar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#070A0F] border-t border-white/[0.08] flex justify-between items-center">
          <span className="text-xs text-[#AEB6C2]/60">Horario oficial República Argentina (UTC-3)</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white uppercase tracking-wider transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
