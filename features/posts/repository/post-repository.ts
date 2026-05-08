import type { Post, PostSummary } from "@/types/post";

export interface PostRepository {
  getPublishedPosts(): Promise<PostSummary[]>;
  getFeaturedPosts(): Promise<PostSummary[]>;
  getPublishedPostBySlug(slug: string): Promise<Post | null>;
}
