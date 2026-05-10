import type { PostRepository } from "@/features/posts/repository/post-repository";
import type { CreatePostInput, Post } from "@/types/post";

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

  async createPost(input: CreatePostInput): Promise<Post> {
    void input;

    throw new Error(
      "MongoDB Atlas must be configured before creating posts from the backoffice.",
    );
  }
}
