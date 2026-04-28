export type LinkCategory = "social" | "web" | "mobile";

export type SocialLink = {
  label: string;
  shortLabel: string;
  href: string;
  category: LinkCategory;
};

export type TechnicalSkill = {
  label: string;
  iconSrc: string;
};

export type InterestItem = {
  label: string;
  iconSrc: string;
};

export type StoreLink = {
  label: string;
  href?: string;
  iconSrc: string;
};

export type WorkLink = {
  title: string;
  href: string;
  note: string;
  category: Exclude<LinkCategory, "social">;
  iconSrc?: string;
  iconLabel?: string;
  storeLinks?: StoreLink[];
};

const svgIcon = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export const siteContent = {
  profile: {
    name: "Samet Kayhan",
    role: "WEB DESIGNER",
    rotatingTitles: [
      "Web Design",
      "Mobile App Developer",
      "Frontend Developer",
      "Product Builder",
    ],
    portrait: {
      src: "/profile.jpg",
      alt: "Samet Kayhan portrait placeholder",
    },
    socialLinks: [
      { label: "GitHub", shortLabel: "GitHub", href: "https://github.com/sametk4yhan", category: "social" },
      { label: "X", shortLabel: "X", href: "https://x.com/Sametk4yhan", category: "social" },
      { label: "Instagram", shortLabel: "Instagram", href: "https://www.instagram.com/sametk4yhan?igsh=eHUzN3F0ZGM3YWd5&utm_source=qr", category: "social" },
      { label: "Pinterest", shortLabel: "Pinterest", href: "https://pin.it/6F1xkb33M", category: "social" },
      { label: "LinkedIn", shortLabel: "LinkedIn", href: "https://www.linkedin.com/in/samet-kayhan-8405441a3", category: "social" },
      { label: "YouTube", shortLabel: "YouTube", href: "https://www.youtube.com/channel/UChT5ZJV2XQSut4acghCytSA", category: "social" },
    ] satisfies SocialLink[],
  },
  hero: {
    greeting: "Hello, I'm",
    rotatingTitles: [
      "Samet Kayhan",
      "Web Design",
      "Mobile App Developer",
      "Frontend Developer",
      "Product Builder",
    ],
    headline: {
      before: "I design and build clean",
      highlight: "web and mobile",
      after: "products with strong visual structure.",
    },
    description:
      "A compact personal hub for selected work, social channels, and product thinking. Structured to feel professional first, and link-directory second.",
  },
  work: {
    web: [
      { title: "Promptdex Web", href: "https://promptdex.app/tr", note: "Open link", category: "web", iconSrc: "https://www.google.com/s2/favicons?sz=64&domain=promptdex.app" },
      { title: "Tasarım Ajansı", href: "https://sametk4yhan.com/", note: "Open link", category: "web", iconSrc: "https://www.google.com/s2/favicons?sz=64&domain=sametk4yhan.com" },
      { title: "Motiff", href: "https://motiff-alpha.vercel.app/", note: "Open link", category: "web", iconSrc: "https://motiff-alpha.vercel.app/icon.svg" },
      { title: "İyilik Hareketi", href: "https://iyilikhareketi.online/", note: "Open link", category: "web", iconLabel: "İH" },
    ] satisfies WorkLink[],
    mobile: [
      {
        title: "Promptdex: AI Prompt Library",
        href: "https://apps.apple.com/tr/app/promptdex-prompt-k%C3%BCt%C3%BCphanesi/id6758352180?l=tr",
        note: "Open link",
        category: "mobile",
        iconSrc: "https://www.google.com/s2/favicons?sz=64&domain=promptdex.app",
        storeLinks: [
          {
            label: "App Store",
            href: "https://apps.apple.com/tr/app/promptdex-prompt-k%C3%BCt%C3%BCphanesi/id6758352180?l=tr",
            iconSrc: "/icons/app-store.png",
          },
          {
            label: "Google Play",
            iconSrc: "/icons/google-play.png",
          },
        ],
      },
      {
        title: "Forkt - Would you Rather",
        href: "https://apps.apple.com/tr/app/forkt-would-you-rather/id6759990583",
        note: "Open link",
        category: "mobile",
        iconSrc: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/45/6e/b3/456eb305-bf42-c102-49f9-8b6d17fd8672/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
        storeLinks: [
          {
            label: "App Store",
            href: "https://apps.apple.com/tr/app/forkt-would-you-rather/id6759990583",
            iconSrc: "/icons/app-store.png",
          },
          {
            label: "Google Play",
            iconSrc: "/icons/google-play.png",
          },
        ],
      },
    ] satisfies WorkLink[],
  },
  blog: [
    {
      title: "Prompt systems for real people",
      excerpt: "Building prompt products means reducing cognitive load, not increasing prompt complexity.",
      meta: "Draft essay",
      status: "Soon",
    },
    {
      title: "Why compact landing pages convert",
      excerpt: "A tighter hierarchy can carry both personal identity and product traffic without feeling like a directory.",
      meta: "Field note",
      status: "Draft",
    },
    {
      title: "Designing with signal, not noise",
      excerpt: "Fewer surfaces, clearer motion, and stronger contrast usually outperform ornamental density.",
      meta: "Studio log",
      status: "Open",
    },
  ],
  technicalSkills: [
    { label: "Next.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { label: "TypeScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { label: "Expo", iconSrc: "https://cdn.worldvectorlogo.com/logos/expo-1.svg" },
    { label: "React", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { label: "React Native", iconSrc: "https://cdn.worldvectorlogo.com/logos/react-native-1.svg" },
    { label: "Cursor", iconSrc: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/cursor.png" },
    { label: "Supabase", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
    { label: "Adobe", iconSrc: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg" },
    { label: "Figma", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  ] satisfies TechnicalSkill[],
  now: [],
  interests: [
    {
      label: "Product Design",
      iconSrc: svgIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="4" fill="#FF7A59"/><rect x="7" y="9" width="10" height="6" rx="2" fill="#FFD2C6"/></svg>`),
    },
    {
      label: "Mobile UX",
      iconSrc: svgIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="6" y="2.5" width="12" height="19" rx="3.5" fill="#34C3FF"/><rect x="9" y="5.5" width="6" height="11" rx="1.5" fill="#D8F4FF"/><circle cx="12" cy="18.5" r="1.2" fill="#0A6F9A"/></svg>`),
    },
    {
      label: "Design Systems",
      iconSrc: svgIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2.2" fill="#8B5CF6"/><rect x="13" y="3" width="8" height="8" rx="2.2" fill="#38BDF8"/><rect x="3" y="13" width="8" height="8" rx="2.2" fill="#F472B6"/><rect x="13" y="13" width="8" height="8" rx="2.2" fill="#22C55E"/></svg>`),
    },
    {
      label: "AI Tools",
      iconSrc: svgIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.2 4.8L19 9l-4.8 2.2L12 16l-2.2-4.8L5 9l4.8-2.2L12 2z" fill="#7CFF8F"/><circle cx="18.5" cy="18.5" r="2.5" fill="#00C2A8"/></svg>`),
    },
    {
      label: "Artificial Intelligence",
      iconSrc: svgIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" fill="#A855F7"/><circle cx="16.5" cy="6.5" r="2.5" fill="#EC4899"/><circle cx="16" cy="16" r="3.5" fill="#6366F1"/><path d="M10.5 9.5L14 8M10 10.5L14 14" stroke="#E9D5FF" stroke-width="1.6" stroke-linecap="round"/></svg>`),
    },
    {
      label: "Digital Branding",
      iconSrc: svgIcon(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.1 5.3L20 9.4l-4.5 3.7 1.4 5.7L12 15.8l-4.9 3 1.4-5.7L4 9.4l5.9-2.1L12 2z" fill="#FBBF24"/><circle cx="12" cy="12" r="2.2" fill="#FFF2B3"/></svg>`),
    },
  ] satisfies InterestItem[],
} as const;
