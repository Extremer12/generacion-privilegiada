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
    dateFormatted: "25 de abril • 21:00 hs",
    title: "GENERACIÓN PRIVILEGIADA",
    tag: "STREAMING EN VIVO",
    description: "Un programa donde la conversación, la música y la palabra se encuentran.",
    hostsCountExtra: "+1",
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
  title: "EL INVITADO ESPECIAL",
  date: "18 de abril de 2025",
  duration: "1:28:45",
  description: "Una charla que no te podés perder. Conversamos sobre fe, sueños y lo que viene.",
  thumbnail: "/images/episode-main.jpg",
  program: "Generación Privilegiada Central",
  views: "14.2K vistas"
};

export const RECENT_EPISODES: Episode[] = [
  {
    id: "ep-sin-filtro",
    title: "SIN FILTRO",
    date: "11 abr 2025",
    duration: "1:15:32",
    thumbnail: "/images/ep-sin-filtro.jpg",
    program: "Debates GP",
    views: "9.8K vistas"
  },
  {
    id: "ep-batalla-biblica",
    title: "BATALLA BÍBLICA",
    date: "04 abr 2025",
    duration: "1:22:18",
    thumbnail: "/images/ep-batalla.jpg",
    program: "Juegos en Vivo",
    views: "18.5K vistas"
  },
  {
    id: "ep-una-cosa-mas",
    title: "UNA COSA MÁS",
    date: "28 mar 2025",
    duration: "1:08:45",
    thumbnail: "/images/ep-unacosamas.jpg",
    program: "Reflexiones GP",
    views: "11.1K vistas"
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
