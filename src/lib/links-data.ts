export type LinkItem = {
  label: string;
  description?: string;
  href: string;
  external: boolean;
};

export type SocialIcon = "github" | "bluesky" | "twitter" | "linkedin" | "instagram";

export type SocialLinkItem = LinkItem & {
  icon: SocialIcon;
};

export const socialLinks: SocialLinkItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/MatheusPBC",
    external: true,
    icon: "github",
  },
];

const socialLinksWithoutLinkedin: SocialLinkItem[] = socialLinks.filter(
  (item) => item.icon !== "linkedin",
);

export const recommendLinks: LinkItem[] = [
];

export const projectLinks: LinkItem[] = [
  {
    label: "Personal Website",
    description: "Portfolio and resume site built with Next.js.",
    href: "/",
    external: false,
  },
  {
    label: "MotoTrilha",
    description: "Python app for trail planning and off-road group operations.",
    href: "https://github.com/MatheusPBC/MotoTrilha",
    external: true,
  },
  {
    label: "RLM RAG Hybrid",
    description: "RAG and agent experiments for codebase research.",
    href: "https://github.com/MatheusPBC/RLM_RAG-hybrid",
    external: true,
  },
  {
    label: "API ANAS Hidro",
    description: "TypeScript API for hydrology and telemetry data.",
    href: "https://github.com/MatheusPBC/API-ANAS-Hidro",
    external: true,
  },
];

export const otherLinks: LinkItem[] = [
  {
    label: "📄 CV (ENG) 🇺🇸",
    href: "/matheus-brackmann-cv-en.pdf",
    external: false,
  },
  {
    label: "📄 CV (PT) 🇧🇷",
    href: "/matheus-brackmann-cv-pt.pdf",
    external: false,
  },
  // {
  //   label: "🔥 NSFW 🔥",
  //   href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  //   external: true,
  // },
];

export type LinksPageData = {
  socialLinks: SocialLinkItem[];
  projectLinks: LinkItem[];
  otherLinks: LinkItem[];
};

export const linkedinLinksPage: LinksPageData = {
  socialLinks,
  projectLinks,
  otherLinks,
};

export const socialLinksPage: LinksPageData = {
  socialLinks: socialLinksWithoutLinkedin,
  projectLinks,
  otherLinks,
};
