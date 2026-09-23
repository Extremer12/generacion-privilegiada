import React from 'react';
import { Calendar, Play, ArrowRight, Clock, Eye } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface NextProgramProps {
  onWatchLive: () => void;
  onViewSchedule: () => void;
}

export const NextProgram: React.FC<NextProgramProps> = ({ onWatchLive, onViewSchedule }) => {
  const { latestBroadcast, hosts } = useAdmin();

  return (
    <section id="ultimo-programa" className="relative z-20 -mt-8 sm:-mt-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header Tag */}
      <div className="flex items-center gap-2 mb-3 text-[#C9A45C] text-xs font-bold tracking-widest uppercase">
        <Calendar className="w-3.5 h-3.5" />
        <span>ÚLTIMO PROGRAMA</span>
      </div>

      {/* Main Horizontal Card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0C121B]/95 backdrop-blur-md p-4 sm:p-6 lg:p-7 shadow-2xl transition-all duration-300 hover:border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Video Thumbnail */}
          <div className="lg:col-span-4 flex flex-col items-stretch">
            {/* Thumbnail Preview with Live Badge */}
            <div className="relative w-full rounded-xl overflow-hidden aspect-video group cursor-pointer border border-white/[0.08]" onClick={onWatchLive}>
              <img
                src={latestBroadcast.thumbnail || "https://i.ytimg.com/vi/zwkn7POAC-Y/hqdefault.jpg"}
                alt={latestBroadcast.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F]/80 via-transparent to-black/30" />
              
              {/* Badge inside thumbnail */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#C9A45C] text-[#070A0F] text-[10px] font-black tracking-wider uppercase shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#070A0F] animate-ping" />
                <span>{latestBroadcast.tag || "ÚLTIMA TRANSMISIÓN"}</span>
              </div>

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="w-12 h-12 rounded-full bg-[#C9A45C] flex items-center justify-center shadow-[0_0_20px_rgba(201,164,92,0.5)] transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-5 h-5 fill-[#070A0F] text-[#070A0F] ml-0.5" />
                </div>
              </div>

              {/* Duration badge */}
              {latestBroadcast.duration && (
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[10px] font-mono text-white/90 flex items-center gap-1 border border-white/10">
                  <Clock className="w-2.5 h-2.5 text-[#C9A45C]" />
                  <span>{latestBroadcast.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Middle: Details & Host Avatars */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
              <h3 className="font-akira text-lg sm:text-xl font-black tracking-wide text-[#F4F5F7]">
                {latestBroadcast.title}
              </h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#C9A45C]/15 border border-[#C9A45C]/30 text-[#E4C77A] tracking-wider uppercase">
                {latestBroadcast.tag}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#C9A45C] mb-2.5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{latestBroadcast.dateFormatted}</span>
              </span>
              {latestBroadcast.views && (
                <>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1 text-[#AEB6C2] font-mono text-[11px]">
                    <Eye className="w-3 h-3 text-[#C9A45C]" />
                    <span>{latestBroadcast.views}</span>
                  </span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#AEB6C2] leading-relaxed mb-4 line-clamp-2">
              {latestBroadcast.description}
            </p>

            {/* Conductores Avatars + Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div>
                <span className="block text-[10px] font-bold text-[#AEB6C2]/70 tracking-wider uppercase mb-1.5">
                  CONDUCTORES
                </span>
                <div className="flex items-center -space-x-2">
                  {hosts.slice(0, 3).map((host) => (
                    <img
                      key={host.id}
                      src={host.image}
                      alt={host.name}
                      title={host.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#0C121B] ring-1 ring-white/10"
                    />
                  ))}
                  {hosts.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-[#151F2C] border-2 border-[#0C121B] ring-1 ring-white/10 flex items-center justify-center text-[10px] font-bold text-[#AEB6C2]">
                      +{hosts.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* YouTube CTA button */}
              <button
                onClick={onWatchLive}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-[#070A0F] stroke-none" />
                <span>REPRODUCIR AHORA</span>
              </button>
            </div>
          </div>

          {/* Right: Cartelera Link */}
          <div className="lg:col-span-3 lg:border-l lg:border-white/[0.08] lg:pl-8 flex lg:flex-col items-center lg:items-center justify-center text-center pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
            <button
              onClick={onViewSchedule}
              className="group flex flex-col items-center gap-2 text-center transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#C9A45C] group-hover:border-[#C9A45C]/50 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-akira text-xs font-bold text-[#F4F5F7] tracking-wider group-hover:text-[#C9A45C] transition-colors">
                  VER
                </span>
                <span className="block font-akira text-xs font-bold text-[#F4F5F7] tracking-wider group-hover:text-[#C9A45C] transition-colors">
                  CARTELERA COMPLETA
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#AEB6C2] group-hover:text-[#C9A45C] transition-colors group-hover:translate-x-1 duration-200" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
