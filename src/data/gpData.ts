import { Host, Episode, RankingUser, SupportGoal } from '../types';

export const GP_CONFIG = {
  name: "GENERACIÓN PRIVILEGIADA",
  shortName: "GP",
  slogan: "UNA GENERACIÓN. UNA COMUNIDAD. UNA MISIÓN.",
  subtext: "Streaming, conversaciones, entretenimiento y fe para una nueva generación.",
  nextLive: {
    isLiveNow: true,
    dayName: "VIER",
    dayNumber: "25",
    month: "ABR",
    dateFormatted: "Todos los sábados • 19:30 hs",
    title: "GENERACIÓN PRIVILEGIADA",
    tag: "STREAMING EN VIVO",
    description: "Transmisión semanal oficial con Cristian Bordón, Victoria Medawar y equipo. Charlas sinceras, historias de vida y comunidad.",
    hostsCountExtra: "+2",
    youtubeUrl: "https://www.youtube.com/@GeneracionPrivilegiada",
  },
  socials: {
    youtube: "https://www.youtube.com/@GeneracionPrivilegiada",
    instagram: "https://www.instagram.com/generacionprivilegiada1",
    tiktok: "https://www.tiktok.com/@generacionprivilegiada",
  },
  funding: {
    current: 87500,
    target: 150000,
    percentage: 58,
    formattedCurrent: "$87.500",
    formattedTarget: "$150.000",
  }
};

export const HOSTS: Host[] = [
  {
    id: "cristian",
    name: "CRISTIAN",
    role: "CONDUCTOR",
    image: "/images/host-cristian.jpg",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
    }
  },
  {
    id: "sofi",
    name: "SOFI",
    role: "CONDUCTORA",
    image: "/images/host-sofi.jpg",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
    }
  },
  {
    id: "lucas",
    name: "LUCAS",
    role: "CONDUCTOR",
    image: "/images/host-lucas.jpg",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
    }
  },
  {
    id: "marcos",
    name: "MARCOS",
    role: "CONDUCTOR",
    image: "/images/host-marcos.jpg",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      youtube: "https://youtube.com",
    }
  },
];

export const LATEST_EPISODE: Episode = {
  id: "ep-latest",
  title: "¿CÓMO EMPEZAR DE CERO?",
  date: "Episodio Destacado",
  duration: "1:24:18",
  description: "Conversamos sobre cómo levantarse cuando todo parece derrumbarse, reinventarse y encontrar un propósito firme en medio de la incertidumbre.",
  thumbnail: "/images/episode-main.jpg",
  program: "Generación Privilegiada Central",
  views: "15.4K vistas"
};

export const RECENT_EPISODES: Episode[] = [
  {
    id: "ep-perdonar",
    title: "¿SE PUEDE PERDONAR LO IMPERDONABLE?",
    date: "Episodio #42",
    duration: "1:18:45",
    thumbnail: "/images/ep-sin-filtro.jpg",
    program: "Debates en Vivo",
    views: "12.8K vistas"
  },
  {
    id: "ep-mate-biblia",
    title: "CON MATE Y BIBLIA",
    date: "Especial GP",
    duration: "1:05:20",
    thumbnail: "/images/ep-batalla.jpg",
    program: "Comunidad GP",
    views: "21.5K vistas"
  },
  {
    id: "ep-decisiones",
    title: "DECISIONES QUE CAMBIAN TODO",
    date: "Episodio #40",
    duration: "1:12:30",
    thumbnail: "/images/ep-unacosamas.jpg",
    program: "Reflexiones GP",
    views: "16.1K vistas"
  }
];

export const RANKING_2026: RankingUser[] = [
  {
    rank: 1,
    name: "Sofi",
    avatar: "/images/host-sofi.jpg",
    points: 2850,
    highlight: true,
  },
  {
    rank: 2,
    name: "Marcos",
    avatar: "/images/host-marcos.jpg",
    points: 2620,
  },
  {
    rank: 3,
    name: "Lucas",
    avatar: "/images/host-lucas.jpg",
    points: 2410,
  },
  {
    rank: 4,
    name: "Ana",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    points: 2050,
  },
  {
    rank: 5,
    name: "Juan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    points: 1940,
  }
];

export const SUPPORT_GOALS: SupportGoal[] = [
  { title: "Internet", iconName: "Wifi", description: "Conexión de fibra simétrica para transmisión ininterrumpida a 4K." },
  { title: "Equipamiento", iconName: "Camera", description: "Cámaras de estudio cinematográficas y consolas de sonido dedicadas." },
  { title: "Iluminación", iconName: "Sun", description: "Paneles LED cálidos de difusión suave y esquema de luces de fondo." },
  { title: "Producción", iconName: "Layers", description: "Desarrollo de gráficas en tiempo real, cortinas de audio y edición continua." },
  { title: "Premios", iconName: "Trophy", description: "Incentivos y reconocimientos para los ganadores de la comunidad en stream." },
  { title: "Mantenimiento", iconName: "Wrench", description: "Soporte técnico del estudio, streaming y servidores de la comunidad." },
];
