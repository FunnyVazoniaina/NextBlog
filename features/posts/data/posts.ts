import type { Post } from "@/types/post";

export const posts: Post[] = [
  {
    slug: "building-a-blog-that-can-grow",
    title: "Building a blog that can grow with my work",
    excerpt:
      "A simple architecture for a personal publication that can start lightweight and scale into a real content platform.",
    category: "engineering",
    tags: ["nextjs", "architecture", "personal-brand"],
    coverLabel: "Architecture notes",
    publishedAt: "2026-04-16",
    readingTimeInMinutes: 6,
    featured: true,
    status: "published",
    content: [
      "A personal blog should be easy to publish from on day one, but it should also leave room for richer workflows later. That is why I like to separate the content model, the repository contract, and the presentation layer early.",
      "In the short term, local in-memory content keeps the code fast to move in. In the medium term, the exact same service contract can point to a database, CMS, or MDX source without rewriting the whole site.",
      "That small bit of structure gives the frontend a stable API, which keeps the project comfortable to maintain as the number of posts, pages, and features grows.",
    ],
  },
  {
    slug: "what-i-learned-from-shipping-small",
    title: "What I learned from shipping small every week",
    excerpt:
      "Weekly shipping created better feedback loops than chasing big perfect launches.",
    category: "product",
    tags: ["shipping", "habits", "feedback"],
    coverLabel: "Weekly habits",
    publishedAt: "2026-03-28",
    readingTimeInMinutes: 4,
    featured: true,
    status: "published",
    content: [
      "The biggest benefit of shipping small is emotional, not technical. Small releases reduce pressure and create momentum.",
      "They also force clearer scope decisions. You become honest about what matters now and what can wait.",
      "That honesty compounds over time and leads to better products, better writing, and a healthier pace of work.",
    ],
  },
  {
    slug: "how-i-balance-code-and-writing",
    title: "How I balance code and writing in the same week",
    excerpt:
      "A practical rhythm for combining deep technical work with public thinking and communication.",
    category: "writing",
    tags: ["writing", "focus", "workflow"],
    coverLabel: "Creative process",
    publishedAt: "2026-02-12",
    readingTimeInMinutes: 5,
    featured: false,
    status: "published",
    content: [
      "I try to give coding and writing different energy slots. Mornings are better for building, while afternoons are better for clarifying what I learned.",
      "That split keeps the two practices from competing too aggressively. Instead, they start feeding each other.",
      "The code produces experience, and the writing turns that experience into reusable insight.",
    ],
  },
];
