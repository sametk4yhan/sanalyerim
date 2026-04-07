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

export const siteContent = {
  profile: {
    name: "Samet Kayhan",
    role: "WEB DESIGNER",
    portrait: {
      src: "/profile.jpg",
      alt: "Samet Kayhan portrait placeholder",
    },
    socialLinks: [
      { label: "GitHub", shortLabel: "GitHub", href: "https://github.com/sametk4yhan", category: "social" },
      { label: "X", shortLabel: "X", href: "https://x.com/Sametk4yhan", category: "social" },
      { label: "Instagram", shortLabel: "Instagram", href: "https://www.instagram.com/sametk4yhan?igsh=eHUzN3F0ZGM3YWd5&utm_source=qr", category: "social" },
      { label: "Pinterest", shortLabel: "Pinterest", href: "https://pin.it/6F1xkb33M", category: "social" },
      { label: "LinkedIn", shortLabel: "LinkedIn", href: "#", category: "social" },
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
      { title: "İyilik Hareketi", href: "https://iyilikhareketi.online/", note: "Open link", category: "web", iconLabel: "İH" },
    ] satisfies WorkLink[],
    mobile: [
      {
        title: "Promptdex",
        href: "https://apps.apple.com/tr/app/promptdex-prompt-k%C3%BCt%C3%BCphanesi/id6758352180?l=tr",
        note: "Open link",
        category: "mobile",
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
    ] satisfies WorkLink[],
  },
  technicalSkills: [
    { label: "Next.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { label: "Adobe", iconSrc: "https://cdn.worldvectorlogo.com/logos/adobe-2.svg" },
    { label: "React", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { label: "WordPress", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg" },
    { label: "TypeScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { label: "React Native", iconSrc: "https://cdn.worldvectorlogo.com/logos/react-native-1.svg" },
    { label: "Expo", iconSrc: "https://cdn.worldvectorlogo.com/logos/expo-1.svg" },
    { label: "Figma", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  ] satisfies TechnicalSkill[],
  interests: ["Product Design", "Mobile UX", "Design Systems", "AI Tools", "Artificial Intelligence", "Digital Branding"],
} as const;
