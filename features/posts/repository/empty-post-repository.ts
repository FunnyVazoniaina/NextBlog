import type { PostRepository } from "@/features/posts/repository/post-repository";

export class EmptyPostRepository implements PostRepository {
  async getPublishedPosts() {
    return [];
  }

  async getFeaturedPosts() {
    return [];
  }

  async getPublishedPostBySlug() {
    return null;
  }
}
