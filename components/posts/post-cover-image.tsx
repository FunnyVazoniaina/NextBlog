import Image from "next/image";

import type { PostCategory } from "@/types/post";

interface PostCoverImageProps {
  title: string;
  category: PostCategory;
  src: string | null;
  sizes: string;
  className?: string;
  priority?: boolean;
}

const categoryThemes: Record<
  PostCategory,
  {
    start: string;
    end: string;
    accent: string;
    eyebrow: string;
  }
> = {
  engineering: {
    start: "#7cc4e8",
    end: "#f2d09d",
    accent: "#1f4b69",
    eyebrow: "ENGINEERING",
  },
  product: {
    start: "#b9d8b8",
    end: "#f0e3bf",
    accent: "#365541",
    eyebrow: "PRODUCT",
  },
  writing: {
    start: "#f2c4a8",
    end: "#f7ece5",
    accent: "#9f5e2c",
    eyebrow: "WRITING",
  },
  career: {
    start: "#efceb8",
    end: "#f9efe8",
    accent: "#8a5128",
    eyebrow: "CAREER",
  },
};

function buildPlaceholderDataUrl(category: PostCategory) {
  const theme = categoryThemes[category];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.start}" />
          <stop offset="100%" stop-color="${theme.end}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" rx="36" />
      <circle cx="970" cy="180" r="126" fill="white" fill-opacity="0.22" />
      <circle cx="240" cy="620" r="170" fill="${theme.accent}" fill-opacity="0.15" />
      <rect x="110" y="110" width="980" height="580" rx="30" fill="white" fill-opacity="0.18" />
      <text x="120" y="190" fill="${theme.accent}" font-family="Georgia, serif" font-size="48" font-weight="700" letter-spacing="10">
        ${theme.eyebrow}
      </text>
      <text x="120" y="310" fill="${theme.accent}" font-family="Georgia, serif" font-size="94" font-weight="700">
        Monblog
      </text>
      <text x="120" y="392" fill="${theme.accent}" font-family="Arial, sans-serif" font-size="34" opacity="0.85">
        Default cover image
      </text>
      <rect x="120" y="470" width="360" height="18" rx="9" fill="${theme.accent}" fill-opacity="0.18" />
      <rect x="120" y="518" width="540" height="18" rx="9" fill="${theme.accent}" fill-opacity="0.14" />
      <rect x="120" y="566" width="420" height="18" rx="9" fill="${theme.accent}" fill-opacity="0.14" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function PostCoverImage({
  title,
  category,
  src,
  sizes,
  className,
  priority,
}: PostCoverImageProps) {
  const imageSrc = src ?? buildPlaceholderDataUrl(category);

  return (
    <div className={joinClassNames("relative overflow-hidden", className)}>
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
