export interface Cta {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  headlineLead: string;
  headlineHighlight: string;
  subtext: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  video: {
    src: string;
    poster: string | null;
  };
  stats: HeroStat[];
}

export interface HomeContent {
  hero: HeroContent;
}