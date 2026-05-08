import { posts } from "@/features/posts/data/posts";
import type { PostRepository } from "@/features/posts/repository/post-repository";

export class InMemoryPostRepository implements PostRepository {
  async getPublishedPosts() {
    return posts
      .filter((post) => post.status === "published")
      .map(({ content, ...postSummary }) => postSummary)
      .sort(
        (left, right) =>
          new Date(right.publishedAt).getTime() -
          new Date(left.publishedAt).getTime(),
      );
  }

  async getFeaturedPosts() {
    const publishedPosts = await this.getPublishedPosts();

    return publishedPosts.filter((post) => post.featured);
  }

  async getPublishedPostBySlug(slug: string) {
    return (
      posts.find(
        (post) => post.slug === slug && post.status === "published",
      ) ?? null
    );
  }
}
