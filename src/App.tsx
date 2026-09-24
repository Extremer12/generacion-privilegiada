import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NextProgram } from './components/NextProgram';
import { LatestEpisode } from './components/LatestEpisode';
import { HostsSection } from './components/HostsSection';
import { SponsorsSection } from './components/SponsorsSection';
import { RankingAndSupport } from './components/RankingAndSupport';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { SupportModal } from './components/SupportModal';
import { RankingModal } from './components/RankingModal';
import { ScheduleModal } from './components/ScheduleModal';
import { GpLoader } from './components/GpLoader';
import { AdminPage } from './components/admin/AdminPage';
import { SponsorsPage } from './components/sponsors/SponsorsPage';
import { AdminProvider } from './context/AdminContext';
import { LATEST_EPISODE } from './data/gpData';
import { Episode } from './types';

import { useScrollAnimation } from './hooks/useScrollAnimation';

const checkIsAdminRoute = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#/admin' ||
    hash === '#admin' ||
    hash.startsWith('#/admin')
  );
};

const checkIsSponsorsRoute = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    path === '/patrocinadores' ||
    path.startsWith('/patrocinadores/') ||
    hash === '#/patrocinadores' ||
    hash === '#patrocinadores' ||
    hash.startsWith('#/patrocinadores')
  );
};

const AppContent: React.FC = () => {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminRoute);
  const [isSponsorsRoute, setIsSponsorsRoute] = useState<boolean>(checkIsSponsorsRoute);

  // Activate scroll-driven reveal animations across the site
  useScrollAnimation();

  useEffect(() => {
    // Initial scroll reset if loading into a subroute
    if (checkIsAdminRoute() || checkIsSponsorsRoute()) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    const handleLocationChange = () => {
      const admin = checkIsAdminRoute();
      const sponsors = checkIsSponsorsRoute();
      setIsAdminRoute(admin);
      setIsSponsorsRoute(sponsors);

      if (admin || sponsors) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleBackToSite = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    if (window.location.hash) {
      window.history.pushState({}, '', window.location.pathname);
    }
    setIsAdminRoute(false);
    setIsSponsorsRoute(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Modals state for public website
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

  // If in Admin route, render Fullscreen Admin Dashboard / Login
  if (isAdminRoute) {
    return <AdminPage onBackToSite={handleBackToSite} />;
  }

  // If in Sponsors route, render Fullscreen Dedicated Sponsors Experience
  if (isSponsorsRoute) {
    return <SponsorsPage onBackToSite={handleBackToSite} />;
  }

  // Otherwise, render Public Website
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

      {/* 3. Último Programa Destacado */}
      <NextProgram
        onWatchLive={handleOpenLive}
        onViewSchedule={() => setScheduleModalOpen(true)}
      />

      {/* 4. Contenido del Canal & Episodios Reales */}
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

      {/* 7. Patrocinadores & Alianzas Comerciales */}
      <SponsorsSection />

      {/* 8. Nosotros / Manifiesto */}
      <AboutSection />

      {/* 9. Contacto / Pedidos de Oración */}
      <ContactSection />

      {/* 10. Footer */}
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

export const App: React.FC = () => {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
};

export default App;
