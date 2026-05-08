import { InMemoryPostRepository } from "@/features/posts/repository/in-memory-post-repository";
import type { PostRepository } from "@/features/posts/repository/post-repository";

export class PostService {
  constructor(private readonly repository: PostRepository) {}

  async getPublishedPosts() {
    return this.repository.getPublishedPosts();
  }

  async getFeaturedPosts() {
    return this.repository.getFeaturedPosts();
  }

  async getPublishedPostBySlug(slug: string) {
    return this.repository.getPublishedPostBySlug(slug);
  }
}

export const postService = new PostService(new InMemoryPostRepository());
