export const siteConfig = {
  name: "Funny Vazoniaina",
  title: "Funny Vazoniaina | Engineering notes and personal essays",
  description:
    "A personal fullstack blog about engineering, product building, and the lessons learned along the way.",
  url: "https://example.com",
  author: {
    name: "Funny Vazoniaina",
    role: "Fullstack developer",
    location: "Madagascar",
    email: "hello@example.com",
  },
  navigation: [
    {
      href: "/",
      label: "Feed",
    },
    {
      href: "/blog",
      label: "Archive",
    },
  ],
  socialLinks: [
    {
      href: "https://github.com/FunnyVazoniaina",
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com",
      label: "LinkedIn",
    },
  ],
} as const;
