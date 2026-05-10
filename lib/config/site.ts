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
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      href: "https://www.linkedin.com",
      label: "LinkedIn",
    },
  ],
  footer: {
    quickLinks: [
      {
        href: "/",
        label: "Feed",
      },
      {
        href: "/blog",
        label: "Blog",
      },
      {
        href: "mailto:hello@example.com",
        label: "Contact",
      },
    ],
    devopsResources: [
      {
        href: "https://www.docker.com/",
        label: "Docker",
      },
      {
        href: "https://kubernetes.io/",
        label: "Kubernetes",
      },
      {
        href: "https://developer.hashicorp.com/terraform",
        label: "Terraform",
      },
      {
        href: "https://github.com/features/actions",
        label: "GitHub Actions",
      },
      {
        href: "https://grafana.com/",
        label: "Grafana",
      },
    ],
    buildWith: [
      {
        href: "https://nextjs.org/",
        label: "Next.js",
      },
      {
        href: "https://www.mongodb.com/products/platform/atlas-database",
        label: "MongoDB Atlas",
      },
      {
        href: "https://www.typescriptlang.org/",
        label: "TypeScript",
      },
      {
        href: "https://vercel.com/",
        label: "Vercel",
      },
    ],
  },
} as const;
