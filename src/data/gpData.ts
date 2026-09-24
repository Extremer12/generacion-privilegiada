import { Host, Episode, RankingUser, SupportGoal } from '../types';

export const GP_CONFIG = {
  name: "GENERACIÓN PRIVILEGIADA",
  shortName: "GP",
  slogan: "UNA GENERACIÓN. UNA COMUNIDAD. UNA MISIÓN.",
  subtext: "Streaming, conversaciones, entretenimiento y fe para una nueva generación.",
  nextLive: {
    isLiveNow: true,
    dayName: "SÁB",
    dayNumber: "26",
    month: "ABR",
    dateFormatted: "Todos los sábados • 19:30 hs",
    title: "CON MATE Y BIBLIA",
    tag: "STREAMING EN VIVO",
    description: "Transmisión semanal oficial con Cristian Bordón, Victoria Medawar y equipo. Charlas sinceras, testimonios reales y comunidad.",
    hostsCountExtra: "+2",
    youtubeUrl: "https://www.youtube.com/@GeneracionPrivilegiada/streams",
    youtubeId: "zwkn7POAC-Y",
    thumbnail: "https://i.ytimg.com/vi/zwkn7POAC-Y/hqdefault.jpg"
  },
  socials: {
    youtube: "https://www.youtube.com/@GeneracionPrivilegiada",
    instagram: "https://www.instagram.com/generacionprivilegiada1",
    tiktok: "https://www.tiktok.com/@generacionprivilegiada",
    whatsapp: "https://wa.me/5492644774742",
    whatsappDisplay: "+54 9 264 477 4742",
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
  id: "zwkn7POAC-Y",
  youtubeId: "zwkn7POAC-Y",
  title: "CON MATE Y BIBLIA / Generación Privilegiada #6",
  date: "Última emisión",
  duration: "1:19:21",
  description: "Sexta emisión en vivo del espacio de debate, mates y reflexión junto a Cristian Bordón, Victoria Medawar y equipo. Charlas sinceras, fe práctica y comunidad.",
  thumbnail: "https://i.ytimg.com/vi/zwkn7POAC-Y/hqdefault.jpg",
  program: "Con Mate y Biblia",
  views: "76 vistas"
};

export const ALL_CHANNEL_EPISODES: (Episode & { category: string })[] = [
  {
    id: "zwkn7POAC-Y",
    youtubeId: "zwkn7POAC-Y",
    title: "CON MATE Y BIBLIA / Generación Privilegiada #6",
    date: "Hace 2 semanas",
    duration: "1:19:21",
    description: "Sexta emisión en vivo de Con Mate y Biblia. Charlas sinceras, debate de la palabra, reflexiones y comunidad.",
    thumbnail: "https://i.ytimg.com/vi/zwkn7POAC-Y/hqdefault.jpg",
    program: "Con Mate y Biblia",
    category: "mate-biblia",
    views: "76 vistas"
  },
  {
    id: "8KInRU9Yz8M",
    youtubeId: "8KInRU9Yz8M",
    title: "DE TINIEBLAS A LA LUZ / Testimonios de vida #3",
    date: "Hace 3 semanas",
    duration: "1:02:03",
    description: "Historias reales de transformación y fe. Testimonios que demuestran cómo la luz de Dios transforma las situaciones más difíciles.",
    thumbnail: "https://i.ytimg.com/vi/8KInRU9Yz8M/hqdefault.jpg",
    program: "Testimonios de Vida",
    category: "testimonios",
    views: "185 vistas"
  },
  {
    id: "myPLwL4Z6GY",
    youtubeId: "myPLwL4Z6GY",
    title: "CON MATE Y BIBLIA / Generación Privilegiada #5",
    date: "Hace 1 mes",
    duration: "41:33",
    description: "Quinta edición con reflexiones y diálogo abierto sobre la vida cotidiana, dudas de los jóvenes y la guía bíblica.",
    thumbnail: "https://i.ytimg.com/vi/myPLwL4Z6GY/hqdefault.jpg",
    program: "Con Mate y Biblia",
    category: "mate-biblia",
    views: "54 vistas"
  },
  {
    id: "7u2njzJ1l7A",
    youtubeId: "7u2njzJ1l7A",
    title: "CON MATE Y BIBLIA / Generación Privilegiada #5 (Parte 2)",
    date: "Hace 1 mes",
    duration: "22:41",
    description: "Segunda parte de la emisión #5 con respuestas a la comunidad y debate en vivo en el chat.",
    thumbnail: "https://i.ytimg.com/vi/7u2njzJ1l7A/hqdefault.jpg",
    program: "Con Mate y Biblia",
    category: "mate-biblia",
    views: "38 vistas"
  },
  {
    id: "_IQ1zjjOMnM",
    youtubeId: "_IQ1zjjOMnM",
    title: "CON MATE Y BIBLIA / Generación Privilegiada #4",
    date: "Hace 1 mes",
    duration: "54:55",
    description: "Abordando desafíos de la juventud actual, cómo pararse frente a la presión social y vivir con propósito.",
    thumbnail: "https://i.ytimg.com/vi/_IQ1zjjOMnM/hqdefault.jpg",
    program: "Con Mate y Biblia",
    category: "mate-biblia",
    views: "49 vistas"
  },
  {
    id: "TJhxlEbktCI",
    youtubeId: "TJhxlEbktCI",
    title: "CRISTIANOS DE PAPEL / Generación Privilegiada #30",
    date: "Hace 2 meses",
    duration: "43:13",
    description: "¿Qué significa vivir una fe genuina frente a las apariencias y la superficialidad? Programa especial #30.",
    thumbnail: "https://i.ytimg.com/vi/TJhxlEbktCI/hqdefault.jpg",
    program: "Especiales GP",
    category: "especiales",
    views: "67 vistas"
  },
  {
    id: "gROF0MsHqeA",
    youtubeId: "gROF0MsHqeA",
    title: "DIOS ME SANÓ, TESTIMONIO DE PASTOR / Testimonios de vida #2",
    date: "Hace 2 meses",
    duration: "1:13:44",
    description: "Poderoso relato de sanidad, restauración y fe inquebrantable en el segmento Testimonios de Vida.",
    thumbnail: "https://i.ytimg.com/vi/gROF0MsHqeA/hqdefault.jpg",
    program: "Testimonios de Vida",
    category: "testimonios",
    views: "142 vistas"
  },
  {
    id: "-gghIi5oeTs",
    youtubeId: "-gghIi5oeTs",
    title: "CON MATE Y BIBLIA / Emisión Especial Extendida",
    date: "Hace 2 meses",
    duration: "1:43:45",
    description: "Transmisión completa con interacción directa con la audiencia en el chat y reflexiones compartidas.",
    thumbnail: "https://i.ytimg.com/vi/-gghIi5oeTs/hqdefault.jpg",
    program: "Con Mate y Biblia",
    category: "mate-biblia",
    views: "88 vistas"
  },
  {
    id: "qhDp7PPQDeM",
    youtubeId: "qhDp7PPQDeM",
    title: "HUMILDAD Y SERVICIO / Generación Privilegiada #29",
    date: "Hace 2 meses",
    duration: "1:06:06",
    description: "Reflexión profunda sobre el liderazgo de servicio, el amor al prójimo y la humildad en el día a día.",
    thumbnail: "https://i.ytimg.com/vi/qhDp7PPQDeM/hqdefault.jpg",
    program: "Especiales GP",
    category: "especiales",
    views: "95 vistas"
  }
];

export const RECENT_EPISODES: Episode[] = ALL_CHANNEL_EPISODES.slice(1, 4);

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
