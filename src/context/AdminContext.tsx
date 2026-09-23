import React, { createContext, useContext, useState, useEffect } from 'react';
import { Host, RankingUser, SupportGoal } from '../types';
import {
  HOSTS as DEFAULT_HOSTS,
  RANKING_2026 as DEFAULT_RANKING,
  SUPPORT_GOALS as DEFAULT_GOALS,
  GP_CONFIG as DEFAULT_CONFIG,
  LATEST_EPISODE as DEFAULT_LATEST
} from '../data/gpData';

export interface AboutConfig {
  badge: string;
  manifestoTitle1: string;
  manifestoTitle2: string;
  manifestoSubtitle: string;
  manifestoDescription: string;
  storyTitle: string;
  storyDescription: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
}

export interface LatestBroadcastConfig {
  title: string;
  tag: string;
  dateFormatted: string;
  duration: string;
  views: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

export interface FundingConfig {
  current: number;
  target: number;
  percentage: number;
  formattedCurrent: string;
  formattedTarget: string;
}

export const DEFAULT_ABOUT: AboutConfig = {
  badge: "NUESTRA IDENTIDAD",
  manifestoTitle1: "MÁS QUE UN STREAMING.",
  manifestoTitle2: "UNA VOZ.",
  manifestoSubtitle: "UNA GENERACIÓN. UNA COMUNIDAD. UNA MISIÓN.",
  manifestoDescription: "Transmitiendo desde nuestro estudio para miles de jóvenes que buscan conversaciones auténticas, profundidad y entretenimiento con propósito.",
  storyTitle: "¿CÓMO NACIÓ GP?",
  storyDescription: "Generación Privilegiada nació de una necesidad real: crear un espacio donde la fe y la cultura de streaming contemporánea dialoguen con honestidad, sin caretas ni formalismos artificiales. Sentarse en una mesa a hablar de la vida, reír, debatir y reflexionar desde una convicción firme.",
  pillar1Title: "COMUNICACIÓN SIN FILTRO",
  pillar1Desc: "Tratamos temas reales que atraviesan a nuestra generación con profundidad, humor y respeto.",
  pillar2Title: "COMUNIDAD ACTIVA",
  pillar2Desc: "La audiencia no es espectadora pasiva: participa, suma puntos en vivo y co-construye cada transmisión.",
};

export const DEFAULT_LATEST_BROADCAST: LatestBroadcastConfig = {
  title: DEFAULT_CONFIG.nextLive.title || "CON MATE Y BIBLIA / GP #6",
  tag: "ÚLTIMA TRANSMISIÓN",
  dateFormatted: DEFAULT_CONFIG.nextLive.dateFormatted || "Sábados • 19:30 hs",
  duration: DEFAULT_LATEST.duration || "1:19:21",
  views: DEFAULT_LATEST.views || "76 vistas",
  description: DEFAULT_CONFIG.nextLive.description || "Transmisión en vivo oficial con Cristian Bordón, Victoria Medawar y equipo. Charlas sinceras, testimonios reales y comunidad.",
  youtubeId: DEFAULT_CONFIG.nextLive.youtubeId || "zwkn7POAC-Y",
  thumbnail: DEFAULT_CONFIG.nextLive.thumbnail || "https://i.ytimg.com/vi/zwkn7POAC-Y/hqdefault.jpg",
};

interface AdminContextType {
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  hosts: Host[];
  ranking: RankingUser[];
  goals: SupportGoal[];
  funding: FundingConfig;
  about: AboutConfig;
  latestBroadcast: LatestBroadcastConfig;
  updateHosts: (hosts: Host[]) => void;
  updateRanking: (ranking: RankingUser[]) => void;
  updateGoals: (goals: SupportGoal[]) => void;
  updateFunding: (current: number, target: number) => void;
  updateAbout: (about: Partial<AboutConfig>) => void;
  updateLatestBroadcast: (data: Partial<LatestBroadcastConfig>) => void;
  resetAllToDefaults: () => void;
}

const STORAGE_KEY = 'gp_admin_data_v1';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load initial state from localStorage or fallback to defaults
  const [hosts, setHosts] = useState<Host[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_hosts`);
      return saved ? JSON.parse(saved) : DEFAULT_HOSTS;
    } catch {
      return DEFAULT_HOSTS;
    }
  });

  const [ranking, setRanking] = useState<RankingUser[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_ranking`);
      return saved ? JSON.parse(saved) : DEFAULT_RANKING;
    } catch {
      return DEFAULT_RANKING;
    }
  });

  const [goals, setGoals] = useState<SupportGoal[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_goals`);
      return saved ? JSON.parse(saved) : DEFAULT_GOALS;
    } catch {
      return DEFAULT_GOALS;
    }
  });

  const [funding, setFunding] = useState<FundingConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_funding`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    const current = DEFAULT_CONFIG.funding.current;
    const target = DEFAULT_CONFIG.funding.target;
    return {
      current,
      target,
      percentage: Math.min(100, Math.round((current / target) * 100)),
      formattedCurrent: `$${current.toLocaleString('es-AR')}`,
      formattedTarget: `$${target.toLocaleString('es-AR')}`,
    };
  });

  const [about, setAbout] = useState<AboutConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_about`);
      return saved ? JSON.parse(saved) : DEFAULT_ABOUT;
    } catch {
      return DEFAULT_ABOUT;
    }
  });

  const [latestBroadcast, setLatestBroadcast] = useState<LatestBroadcastConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_broadcast`);
      return saved ? JSON.parse(saved) : DEFAULT_LATEST_BROADCAST;
    } catch {
      return DEFAULT_LATEST_BROADCAST;
    }
  });

  // Listen to keyboard shortcut Ctrl+Shift+A to toggle admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateHosts = (newHosts: Host[]) => {
    setHosts(newHosts);
    localStorage.setItem(`${STORAGE_KEY}_hosts`, JSON.stringify(newHosts));
  };

  const updateRanking = (newRanking: RankingUser[]) => {
    setRanking(newRanking);
    localStorage.setItem(`${STORAGE_KEY}_ranking`, JSON.stringify(newRanking));
  };

  const updateGoals = (newGoals: SupportGoal[]) => {
    setGoals(newGoals);
    localStorage.setItem(`${STORAGE_KEY}_goals`, JSON.stringify(newGoals));
  };

  const updateFunding = (current: number, target: number) => {
    const safeTarget = target > 0 ? target : 1;
    const percentage = Math.min(100, Math.round((current / safeTarget) * 100));
    const newFunding: FundingConfig = {
      current,
      target: safeTarget,
      percentage,
      formattedCurrent: `$${current.toLocaleString('es-AR')}`,
      formattedTarget: `$${safeTarget.toLocaleString('es-AR')}`,
    };
    setFunding(newFunding);
    localStorage.setItem(`${STORAGE_KEY}_funding`, JSON.stringify(newFunding));
  };

  const updateAbout = (partialAbout: Partial<AboutConfig>) => {
    const newAbout = { ...about, ...partialAbout };
    setAbout(newAbout);
    localStorage.setItem(`${STORAGE_KEY}_about`, JSON.stringify(newAbout));
  };

  const updateLatestBroadcast = (partialBroadcast: Partial<LatestBroadcastConfig>) => {
    const newBroadcast = { ...latestBroadcast, ...partialBroadcast };
    setLatestBroadcast(newBroadcast);
    localStorage.setItem(`${STORAGE_KEY}_broadcast`, JSON.stringify(newBroadcast));
  };

  const resetAllToDefaults = () => {
    setHosts(DEFAULT_HOSTS);
    setRanking(DEFAULT_RANKING);
    setGoals(DEFAULT_GOALS);
    const curr = DEFAULT_CONFIG.funding.current;
    const targ = DEFAULT_CONFIG.funding.target;
    setFunding({
      current: curr,
      target: targ,
      percentage: Math.min(100, Math.round((curr / targ) * 100)),
      formattedCurrent: `$${curr.toLocaleString('es-AR')}`,
      formattedTarget: `$${targ.toLocaleString('es-AR')}`,
    });
    setAbout(DEFAULT_ABOUT);
    setLatestBroadcast(DEFAULT_LATEST_BROADCAST);

    localStorage.removeItem(`${STORAGE_KEY}_hosts`);
    localStorage.removeItem(`${STORAGE_KEY}_ranking`);
    localStorage.removeItem(`${STORAGE_KEY}_goals`);
    localStorage.removeItem(`${STORAGE_KEY}_funding`);
    localStorage.removeItem(`${STORAGE_KEY}_about`);
    localStorage.removeItem(`${STORAGE_KEY}_broadcast`);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminOpen,
        setIsAdminOpen,
        hosts,
        ranking,
        goals,
        funding,
        about,
        latestBroadcast,
        updateHosts,
        updateRanking,
        updateGoals,
        updateFunding,
        updateAbout,
        updateLatestBroadcast,
        resetAllToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
