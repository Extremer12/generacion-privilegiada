import React from 'react';
import { X, ExternalLink, Play } from 'lucide-react';
import { Episode } from '../types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  episode: Episode | null;
  isLive?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  episode,
  isLive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0C121B] border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#070A0F]">
          <div className="flex items-center gap-3">
            {isLive ? (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E53935] text-white text-[10px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                TRANSMISIÓN EN VIVO
              </span>
            ) : (
              <span className="text-xs font-bold text-[#C9A45C] tracking-wider uppercase font-akira">
                {episode?.program || 'EPISODIO'}
              </span>
            )}
            <h3 className="font-sans font-bold text-sm text-[#F4F5F7] truncate max-w-md">
              {episode?.title || 'Generación Privilegiada'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/20 text-[#AEB6C2] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Frame with Real YouTube Embed */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {episode?.youtubeId ? (
            <iframe
              className="w-full h-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}?autoplay=1&rel=0`}
              title={episode.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center group">
              <img
                src={episode?.thumbnail || '/images/studio-hero.jpg'}
                alt="Video preview"
                className="w-full h-full object-cover filter brightness-75 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="relative z-10 flex flex-col items-center text-center p-6">
                <a
                  href="https://www.youtube.com/@GeneracionPrivilegiada/streams"
                  target="_blank"
                  rel="noreferrer"
                  className="w-20 h-20 rounded-full bg-[#C9A45C] hover:bg-[#E4C77A] text-[#070A0F] flex items-center justify-center shadow-[0_0_40px_rgba(201,164,92,0.6)] transform hover:scale-105 transition-all duration-300 mb-4"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </a>
                <span className="font-akira text-sm tracking-wider text-white uppercase drop-shadow-md">
                  VER EN YOUTUBE
                </span>
                <span className="text-xs text-[#AEB6C2] mt-1">
                  {episode?.duration ? `Duración: ${episode.duration}` : 'Transmisión en vivo'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer info inside modal */}
        <div className="p-6 bg-[#0C121B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-akira text-base font-bold text-white mb-1">
              {episode?.title}
            </h4>
            <p className="text-xs text-[#AEB6C2]">
              {episode?.description || 'Transmisión oficial de Generación Privilegiada.'}
            </p>
          </div>

          <a
            href={episode?.youtubeId ? `https://www.youtube.com/watch?v=${episode.youtubeId}` : "https://www.youtube.com/@GeneracionPrivilegiada/streams"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A45C] hover:bg-[#E4C77A] text-xs font-bold text-[#070A0F] tracking-wider uppercase transition-colors whitespace-nowrap shadow-md"
          >
            <span>ABRIR EN YOUTUBE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
