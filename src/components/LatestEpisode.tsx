import React from 'react';
import { Play, Calendar, Clock, Zap } from 'lucide-react';
import { LATEST_EPISODE, RECENT_EPISODES } from '../data/gpData';
import { Episode } from '../types';

interface LatestEpisodeProps {
  onPlayEpisode: (episode: Episode) => void;
}

export const LatestEpisode: React.FC<LatestEpisodeProps> = ({ onPlayEpisode }) => {
  return (
    <section className="relative py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <h2 className="font-akira text-xl sm:text-2xl font-black tracking-wider text-[#F4F5F7] mb-8 uppercase">
        ÚLTIMO EPISODIO
      </h2>

      {/* Main Grid: Featured Player Left + Previous Episodes Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left: Featured Latest Episode (Span 7) */}
        <div className="xl:col-span-6 flex flex-col md:flex-row gap-6 items-center">
          
          {/* Main Video Thumbnail */}
          <div
            onClick={() => onPlayEpisode(LATEST_EPISODE)}
            className="relative w-full md:w-3/5 rounded-2xl overflow-hidden aspect-video group cursor-pointer border border-white/[0.08] shadow-2xl transition-all duration-300 hover:border-[#C9A45C]/50"
          >
            <img
              src={LATEST_EPISODE.thumbnail}
              alt={LATEST_EPISODE.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#070A0F]/70 backdrop-blur-md border border-[#C9A45C]/60 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#070A0F] group-hover:scale-110 transition-all duration-300 shadow-xl">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>

            {/* Duration Stamp */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-[11px] font-mono font-medium text-white/90">
              <Clock className="w-3 h-3 text-[#C9A45C]" />
              <span>{LATEST_EPISODE.duration}</span>
            </div>
          </div>

          {/* Episode Info & CTA */}
          <div className="w-full md:w-2/5 flex flex-col justify-center">
            <h3 className="font-akira text-lg sm:text-xl font-black tracking-wide text-[#F4F5F7] mb-2 leading-snug">
              {LATEST_EPISODE.title}
            </h3>

            <p className="flex items-center gap-2 text-xs text-[#AEB6C2] font-medium mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{LATEST_EPISODE.date}</span>
              <span className="text-white/20">•</span>
              <span>{LATEST_EPISODE.duration}</span>
            </p>

            <p className="text-xs sm:text-sm text-[#AEB6C2] leading-relaxed mb-5">
              {LATEST_EPISODE.description}
            </p>

            <button
              onClick={() => onPlayEpisode(LATEST_EPISODE)}
              className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Play className="w-3.5 h-3.5 fill-[#070A0F] stroke-none" />
              <span>VER EN YOUTUBE</span>
            </button>
          </div>

        </div>

        {/* Right: Previous Episodes Grid (Span 6) */}
        <div className="xl:col-span-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-[#AEB6C2] uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>EPISODIOS ANTERIORES</span>
          </div>

          {/* 3 Thumbnails Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {RECENT_EPISODES.map((ep) => (
              <div
                key={ep.id}
                onClick={() => onPlayEpisode(ep)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative rounded-xl overflow-hidden aspect-video border border-white/[0.08] group-hover:border-[#C9A45C]/50 transition-all duration-300 mb-2.5 shadow-md">
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                  {/* Play icon overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-[#C9A45C] flex items-center justify-center text-[#070A0F] shadow-lg">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono text-white/90">
                    {ep.duration}
                  </div>
                </div>

                {/* Metadata */}
                <h4 className="font-akira text-xs font-bold text-[#F4F5F7] tracking-wider group-hover:text-[#C9A45C] transition-colors leading-tight mb-1">
                  {ep.title}
                </h4>
                <p className="text-[11px] text-[#AEB6C2]/80 font-medium">
                  {ep.date}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
