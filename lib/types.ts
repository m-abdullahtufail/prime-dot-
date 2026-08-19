export type Link = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type TitleLine = {
  text: string;
  accent?: boolean;
};

export type Service = {
  title: string;
  tag: string;
  description: string;
};

export type Member = {
  name: string;
  role: string;
  initials: string;
  bio: string;
};

export type Reason = {
  title: string;
  body: string;
};

export type PageContent = {
  kicker: string;
  titlePrefix: string;
  titleAccent: string;
  subtitle?: string;
  metaTitle: string;
  metaDescription: string;
};

export type SiteContent = {
  updatedAt: string;
  brand: {
    name: string;
    nameAccent: string;
    tagline: string;
    logo: string;
  };
  nav: {
    links: Link[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    kicker: string;
    headline: TitleLine[];
    subtitle: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    stats: Stat[];
  };
  marquee: {
    items: string[];
  };
  servicesSection: {
    kicker: string;
    title: TitleLine[];
    description: string;
    viewAllLabel: string;
    allCard: {
      count: string;
      title: string;
      body: string;
      label: string;
    };
  };
  services: Service[];
  whySection: {
    kicker: string;
    titlePrefix: string;
    titleAccent: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  stats: Stat[];
  reasons: Reason[];
  teamSection: {
    kicker: string;
    title: TitleLine[];
    description: string;
    viewAllLabel: string;
  };
  team: Member[];
  contactSection: {
    kicker: string;
    titlePrefix: string;
    titleAccent: string;
    body: string;
    email: string;
    backLabel: string;
    backHref: string;
  };
  location: {
    kicker: string;
    title: TitleLine[];
    description: string;
    name: string;
    address: string[];
    email: string;
    hours: string;
    mapQuery: string;
    mapTitle: string;
    directionsUrl: string;
    buttonLabel: string;
  };
  footer: {
    about: string;
    socials: Link[];
    copyrightSuffix: string;
    crafted: string;
    craftedAccent: string;
  };
  pages: {
    services: PageContent;
    team: PageContent;
    why: PageContent;
    contact: PageContent;
  };
  seo: {
    siteTitle: string;
    siteDescription: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
};
