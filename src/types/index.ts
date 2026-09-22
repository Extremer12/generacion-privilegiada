export interface Host {
  id: string;
  name: string;
  role: string;
  image: string;
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

export interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  description?: string;
  thumbnail: string;
  youtubeId?: string;
  program?: string;
  views?: string;
}

export interface RankingUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  highlight?: boolean;
}

export interface SupportGoal {
  title: string;
  iconName: string;
  description: string;
}
