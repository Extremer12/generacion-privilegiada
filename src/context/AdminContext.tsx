import React, { createContext, useContext, useState } from 'react';
import { Host, RankingUser, SupportGoal } from '../types';
import {
  HOSTS as DEFAULT_HOSTS,
  RANKING_2026 as DEFAULT_RANKING,
  SUPPORT_GOALS as DEFAULT_GOALS,
  GP_CONFIG as DEFAULT_CONFIG,
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

interface AdminContextType {
  hosts: Host[];
  ranking: RankingUser[];
  goals: SupportGoal[];
  funding: FundingConfig;
  about: AboutConfig;
  updateHosts: (hosts: Host[]) => void;
  updateRanking: (ranking: RankingUser[]) => void;
  updateGoals: (goals: SupportGoal[]) => void;
  updateFunding: (current: number, target: number) => void;
  updateAbout: (about: Partial<AboutConfig>) => void;
  resetAllToDefaults: () => void;
}

const STORAGE_KEY = 'gp_admin_data_v1';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

    localStorage.removeItem(`${STORAGE_KEY}_hosts`);
    localStorage.removeItem(`${STORAGE_KEY}_ranking`);
    localStorage.removeItem(`${STORAGE_KEY}_goals`);
    localStorage.removeItem(`${STORAGE_KEY}_funding`);
    localStorage.removeItem(`${STORAGE_KEY}_about`);
  };

  return (
    <AdminContext.Provider
      value={{
        hosts,
        ranking,
        goals,
        funding,
        about,
        updateHosts,
        updateRanking,
        updateGoals,
        updateFunding,
        updateAbout,
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
