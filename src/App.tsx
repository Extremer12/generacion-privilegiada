import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NextProgram } from './components/NextProgram';
import { LatestEpisode } from './components/LatestEpisode';
import { HostsSection } from './components/HostsSection';
import { RankingAndSupport } from './components/RankingAndSupport';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { SupportModal } from './components/SupportModal';
import { RankingModal } from './components/RankingModal';
import { ScheduleModal } from './components/ScheduleModal';
import { GpLoader } from './components/GpLoader';
import { Episode } from './types';
import { LATEST_EPISODE } from './data/gpData';

export const App: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isLiveStream, setIsLiveStream] = useState(false);

  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [rankingModalOpen, setRankingModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const handleOpenLive = () => {
    setSelectedEpisode(LATEST_EPISODE);
    setIsLiveStream(true);
    setVideoModalOpen(true);
  };

  const handlePlayEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsLiveStream(false);
    setVideoModalOpen(true);
  };

  const handleWatchLatest = () => {
    setSelectedEpisode(LATEST_EPISODE);
    setIsLiveStream(false);
    setVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#F4F5F7] font-sans antialiased overflow-x-hidden">
      {/* 0. Brand SVG Drawing Loader */}
      <GpLoader />

      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Cinematográfico */}
      <Hero
        onWatchLatest={handleWatchLatest}
        onViewSchedule={() => setScheduleModalOpen(true)}
      />

      {/* 3. Próximo Programa / Ahora */}
      <NextProgram
        onWatchLive={handleOpenLive}
        onViewSchedule={() => setScheduleModalOpen(true)}
      />

      {/* 4. Último Episodio & Episodios Anteriores */}
      <LatestEpisode
        onPlayEpisode={handlePlayEpisode}
      />

      {/* 5. Conocé al Equipo (Conductores) */}
      <HostsSection
        onViewAll={() => setScheduleModalOpen(true)}
      />

      {/* 6. Ranking 2026 & Apoyá Generación Privilegiada */}
      <RankingAndSupport
        onOpenSupportModal={() => setSupportModalOpen(true)}
        onViewFullRanking={() => setRankingModalOpen(true)}
        onViewAllGoals={() => setSupportModalOpen(true)}
      />

      {/* 7. Nosotros / Manifiesto */}
      <AboutSection />

      {/* 8. Contacto / Pedidos de Oración */}
      <ContactSection />

      {/* 9. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        episode={selectedEpisode}
        isLive={isLiveStream}
      />

      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />

      <RankingModal
        isOpen={rankingModalOpen}
        onClose={() => setRankingModalOpen(false)}
      />

      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onWatchLive={handleOpenLive}
      />

    </div>
  );
};

export default App;
