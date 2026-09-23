import React, { useState } from 'react';
import { X, Trophy, History, Award } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RankingModal: React.FC<RankingModalProps> = ({ isOpen, onClose }) => {
  const { ranking } = useAdmin();
  const [selectedYear, setSelectedYear] = useState<'2026' | '2025'>('2026');
  const [activeTab, setActiveTab] = useState<'tabla' | 'historial'>('tabla');

  if (!isOpen) return null;

  // History of manual assignments by GP team as defined in brief #22
  const pointLogs = [
    {
      id: "log-1",
      date: "18 Abr 2026",
      user: "Sofi",
      points: "+100",
      reason: "Ganadora Batalla Bíblica",
      show: "Episodio #42",
      moderator: "Lucas (Admin)",
    },
    {
      id: "log-2",
      date: "18 Abr 2026",
      user: "Marcos",
      points: "+50",
      reason: "Participación destacada en chat",
      show: "Episodio #42",
      moderator: "Cristian (Mod)",
    },
    {
      id: "log-3",
      date: "11 Abr 2026",
      user: "Lucas",
      points: "+75",
      reason: "Desafío especial en vivo",
      show: "Sin Filtro #12",
      moderator: "Sofi (Mod)",
    },
    {
      id: "log-4",
      date: "04 Abr 2026",
      user: "Ana",
      points: "+100",
      reason: "Premio trivia comunitaria",
      show: "Batalla Bíblica #08",
      moderator: "Cristian (Mod)",
    },
    {
      id: "log-5",
      date: "28 Mar 2026",
      user: "Juan",
      points: "+50",
      reason: "Reconocimiento del programa",
      show: "Una Cosa Más #04",
      moderator: "Lucas (Admin)",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0C121B] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#070A0F]">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-[#C9A45C]" />
            <h3 className="font-akira text-sm sm:text-base font-black text-white uppercase tracking-wider">
              RANKING COMUNIDAD GP
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/20 text-[#AEB6C2] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Year Filter & Tabs Bar */}
        <div className="px-6 py-3.5 bg-[#111A25] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          {/* Year selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#AEB6C2] uppercase">TEMPORADA:</span>
            {(['2026', '2025'] as const).map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded-lg text-xs font-akira transition-colors ${
                  selectedYear === year
                    ? 'bg-[#C9A45C] text-[#070A0F] font-bold'
                    : 'bg-[#070A0F] text-[#AEB6C2] hover:text-white border border-white/10'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Sub-view toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#070A0F] border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('tabla')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'tabla'
                  ? 'bg-white/15 text-white'
                  : 'text-[#AEB6C2] hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>TABLA</span>
            </button>
            <button
              onClick={() => setActiveTab('historial')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'historial'
                  ? 'bg-white/15 text-white'
                  : 'text-[#AEB6C2] hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>HISTORIAL DE PUNTOS</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          
          {activeTab === 'tabla' ? (
            <div className="space-y-2.5">
              {ranking.map((user) => {
                const isFirst = user.rank === 1;
                return (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                      isFirst
                        ? 'bg-[#151F2C] border-[#C9A45C]/40 shadow-sm'
                        : 'bg-[#111A25]/50 border-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-akira text-xs font-black ${
                          isFirst
                            ? 'bg-[#C9A45C] text-[#070A0F]'
                            : 'bg-white/10 text-[#AEB6C2]'
                        }`}
                      >
                        {user.rank}
                      </span>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`w-9 h-9 rounded-full object-cover border ${
                          isFirst ? 'border-[#C9A45C]' : 'border-white/10'
                        }`}
                      />
                      <div>
                        <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                          {user.name}
                          {isFirst && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C9A45C]/20 text-[#E4C77A]">
                              LÍDER
                            </span>
                          )}
                        </h4>
                        <span className="text-[11px] text-[#AEB6C2]/60">Comunidad Oficial GP</span>
                      </div>
                    </div>

                    <div className="font-mono text-sm font-bold text-right">
                      <span className={isFirst ? 'text-[#E4C77A]' : 'text-white'}>
                        {user.points.toLocaleString()}
                      </span>{' '}
                      <span className="text-[11px] text-[#AEB6C2]/60 uppercase font-sans">pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Historial de Puntos Transparente */
            <div className="space-y-3">
              <p className="text-xs text-[#AEB6C2] mb-3">
                Historial de puntos otorgados en vivo por el equipo de moderación durante transmisiones oficiales:
              </p>

              <div className="divide-y divide-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden bg-[#111A25]/40">
                {pointLogs.map((log) => (
                  <div key={log.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-white">{log.user}</span>
                        <span className="font-mono text-xs font-bold text-[#C9A45C] bg-[#C9A45C]/10 px-2 py-0.5 rounded">
                          {log.points} pts
                        </span>
                        <span className="text-[11px] text-[#AEB6C2]/60">• {log.date}</span>
                      </div>
                      <p className="text-xs text-[#AEB6C2]">{log.reason}</p>
                    </div>

                    <div className="text-right text-[11px] text-[#AEB6C2]/60">
                      <span className="block font-medium text-white/80">{log.show}</span>
                      <span>Por: {log.moderator}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#070A0F] border-t border-white/[0.08] flex items-center justify-between">
          <p className="text-[11px] text-[#AEB6C2]/60">
            Los puntos no tienen valor monetario. Reconocen la fidelidad y participación en el stream.
          </p>
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
