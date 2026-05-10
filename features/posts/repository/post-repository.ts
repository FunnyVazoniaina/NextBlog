import type { CreatePostInput, Post, PostSummary } from "@/types/post";

export interface PostRepository {
  getPublishedPosts(): Promise<PostSummary[]>;
  getFeaturedPosts(): Promise<PostSummary[]>;
  getPublishedPostBySlug(slug: string): Promise<Post | null>;
  createPost(input: CreatePostInput): Promise<Post>;
  updatePostFeatured(slug: string, featured: boolean): Promise<void>;
}
