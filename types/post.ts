export type PostCategory = "engineering" | "product" | "writing" | "career";

export type PostStatus = "draft" | "published";

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  tags: string[];
  coverLabel: string;
  publishedAt: string;
  readingTimeInMinutes: number;
  featured: boolean;
  status: PostStatus;
}

export interface Post extends PostSummary {
  content: string[];
}
