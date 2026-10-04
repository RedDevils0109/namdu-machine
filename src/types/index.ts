export interface ImageAsset {
  src: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "facebook" | "youtube" | "linkedin" | "tiktok" | "instagram";
  url: string;
}

export interface SiteConfig {
  companyName: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: ImageAsset;
  logoLight: ImageAsset;
  favicon: string;
  siteUrl: string;
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    whatsapp: string;
    /** WhatsApp number as shown on the page; falls back to `+` and the digits. */
    whatsappDisplay?: string;
    zalo: string;
    address: string;
    workingHours: string;
    mapEmbedUrl: string;
    mapLink: string;
  };
  socials: SocialLink[];
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    keywords: string[];
    ogImage: string;
  };
}

export interface Navigation {
  header: NavLink[];
  footer: {
    title: string;
    links: NavLink[];
  }[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  categorySlug?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  country: string;
  avatar?: string;
}

export interface Partner {
  /** Used as the logo's alt text and link label; not displayed. */
  name: string;
  logo: string;
  /** Partner website. Without it the logo is not clickable. */
  link?: string;
}

export interface MarketRegion {
  name: string;
  description: string;
  countries: string[];
  /** Shown as the featured card with the "core market" label. */
  highlight?: boolean;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: ImageAsset;
    primaryCta: NavLink;
    secondaryCta: NavLink;
  };
  stats: Stat[];
  whyChooseUs: {
    title: string;
    subtitle: string;
    items: Feature[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  markets: {
    title: string;
    subtitle: string;
    regions: MarketRegion[];
  };
  testimonials: Testimonial[];
  cta: {
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  image: ImageAsset;
}

export interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
    image: ImageAsset;
  };
  story: {
    title: string;
    paragraphs: string[];
    image: ImageAsset;
  };
  mission: string;
  vision: string;
  values: Feature[];
  milestones: Milestone[];
  /** Videos from `videos.json`, referenced by `id`. */
  factoryVideos: { id: string }[];
  certifications: Certification[];
}

export interface Category {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: ImageAsset;
  order: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  categorySlug: string;
  name: string;
  model: string;
  shortDescription: string;
  description: string;
  images: ImageAsset[];
  videoUrl?: string;
  specs: ProductSpec[];
  features: string[];
  applications: string[];
  featured: boolean;
  badge?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  /** YouTube link (played in the YouTube player) or a direct video file link such as a Cloudinary `.mp4`. */
  videoUrl: string;
  /** Optional: YouTube links use YouTube's thumbnail, other videos show their first frame. */
  thumbnail?: string;
  topic: string;
  productSlug?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export type IconName =
  | "shield"
  | "gear"
  | "globe"
  | "wrench"
  | "leaf"
  | "chart"
  | "users"
  | "award"
  | "truck"
  | "headset";
