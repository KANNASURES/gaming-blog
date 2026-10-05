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

export interface AffiliateOffer {
  label: string;
  url: string;
  merchant: string;
}

export interface FeaturedReviewContent {
  sectionLabel: string;
  title: string;
  genre: string;
  platform: string;
  score: number;
  verdict: string;
  image: { src: string | null; alt: string };
  pros: string[];
  cons: string[];
  reviewHref: string;
  reviewCtaLabel: string;
  affiliate: AffiliateOffer;
}
export interface TrendingGame {
  id: string;
  title: string;
  genre: string;
  rating: number;
  badge: string | null;
  tags: string[];
  href: string;
  image: { src: string | null; alt: string };
}

export interface TrendingGamesContent {
  sectionLabel: string;
  title: string;
  subtitle: string;
  viewAll: Cta;
  games: TrendingGame[];
}
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  gameCount: number;
  href: string;
}

export interface CategoriesContent {
  sectionLabel: string;
  title: string;
  subtitle: string;
  countSuffix: string;
  items: CategoryItem[];
}
export interface HomeContent {
  hero: HeroContent;
  featuredReview: FeaturedReviewContent;
  trendingGames: TrendingGamesContent;
  categories: CategoriesContent;
}