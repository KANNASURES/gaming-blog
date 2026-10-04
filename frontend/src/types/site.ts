export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  headerCta: { label: string; href: string };
  navigation: NavItem[];
  footer: {
    description: string;
    columns: FooterColumn[];
    disclosure: string;
  };
  social: SocialLink[];
  seo: { description: string };
}