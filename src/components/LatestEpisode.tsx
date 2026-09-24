import React, { useState } from 'react';
import { Play, Calendar, Clock, Eye, ExternalLink } from 'lucide-react';
import { ALL_CHANNEL_EPISODES } from '../data/gpData';
import { Episode } from '../types';

interface LatestEpisodeProps {
  onPlayEpisode: (episode: Episode) => void;
}

type CategoryFilter = 'todos' | 'mate-biblia' | 'testimonios' | 'especiales';

export const LatestEpisode: React.FC<LatestEpisodeProps> = ({ onPlayEpisode }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('todos');

  const filteredEpisodes = ALL_CHANNEL_EPISODES.filter((ep) => {
    if (activeCategory === 'todos') return true;
    return ep.category === activeCategory;
  });

  return (
    <section id="programas" className="reveal-on-scroll relative py-16 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/[0.06] gap-4">
        <div>
          <div className="mb-2 text-[#C9A45C] text-xs font-bold tracking-widest uppercase">
            <span>TRANSMISIONES & EPISODIOS REALES</span>
          </div>
          <h2 className="font-akira text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider text-[#F4F5F7] uppercase">
            CONTENIDO DEL CANAL
          </h2>
        </div>

        <a
          href="https://www.youtube.com/@GeneracionPrivilegiada/streams"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#AEB6C2] hover:text-[#C9A45C] uppercase transition-colors"
        >
          <span>IR AL CANAL DE YOUTUBE</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#C9A45C]" />
        </a>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        {[
          { key: 'todos', label: 'TODOS LOS VIDEOS' },
          { key: 'mate-biblia', label: 'CON MATE Y BIBLIA' },
          { key: 'testimonios', label: 'TESTIMONIOS DE VIDA' },
          { key: 'especiales', label: 'PROGRAMAS ESPECIALES' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key as CategoryFilter)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
              activeCategory === tab.key
                ? 'bg-[#C9A45C] text-[#070A0F] shadow-[0_0_15px_rgba(201,164,92,0.3)]'
                : 'bg-[#111A25] text-[#AEB6C2] hover:text-white hover:bg-[#152232] border border-white/[0.06]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Grid of Real Videos from Channel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEpisodes.map((ep) => (
          <div
            key={ep.id}
            onClick={() => onPlayEpisode(ep)}
            className="group cursor-pointer rounded-2xl bg-[#0C121B] border border-white/[0.08] hover:border-[#C9A45C]/50 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
          >
            {/* Real YouTube Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={ep.thumbnail}
                alt={ep.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/15 transition-colors" />

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#C9A45C] flex items-center justify-center text-[#070A0F] shadow-[0_0_20px_rgba(201,164,92,0.5)] transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Category pill */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-bold text-[#E4C77A] tracking-wider uppercase">
                {ep.program || 'GP STREAM'}
              </div>

              {/* Duration Stamp */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[10px] font-mono text-white/90 flex items-center gap-1 border border-white/10">
                <Clock className="w-2.5 h-2.5 text-[#C9A45C]" />
                <span>{ep.duration}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-sans font-bold text-sm text-[#F4F5F7] group-hover:text-[#C9A45C] transition-colors leading-snug line-clamp-2 mb-2">
                  {ep.title}
                </h4>
                <p className="text-xs text-[#AEB6C2]/80 line-clamp-2 leading-relaxed mb-3">
                  {ep.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] text-[11px] text-[#AEB6C2]/70">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C9A45C]" />
                  {ep.date}
                </span>
                {ep.views && (
                  <span className="flex items-center gap-1 font-mono">
                    <Eye className="w-3 h-3 text-[#AEB6C2]/60" />
                    {ep.views}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Footer CTA to official channel */}
      <div className="mt-12 text-center">
        <a
          href="https://www.youtube.com/@GeneracionPrivilegiada/streams"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111A25] hover:bg-[#152232] border border-white/10 hover:border-[#C9A45C]/50 text-xs sm:text-sm font-bold tracking-wider text-white hover:text-[#C9A45C] uppercase transition-all duration-300 shadow-xl"
        >
          <span>VER TODAS LAS TRANSMISIONES EN EL CANAL OFICIAL (+30 EPISODIOS)</span>
          <ExternalLink className="w-4 h-4 text-[#C9A45C]" />
        </a>
      </div>
    </section>
  );
};
