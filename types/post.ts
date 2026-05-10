export type PostCategory = "engineering" | "product" | "writing" | "career";

export type PostStatus = "draft" | "published";

export interface PostSourceLink {
  label: string;
  url: string;
}

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
  sourceLinks: PostSourceLink[];
  coverImageUrl: string | null;
}

export interface Post extends PostSummary {
  content: string[];
}

export interface PostDocument
  extends Omit<Post, "publishedAt" | "sourceLinks" | "coverImageUrl"> {
  publishedAt: string | Date;
  sourceLinks?: PostSourceLink[];
  coverImageUrl?: string | null;
}

export interface CreatePostInput {
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
  content: string[];
  sourceLinks: PostSourceLink[];
  coverImageUrl: string | null;
}
