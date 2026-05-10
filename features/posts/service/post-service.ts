import { createPostRepository } from "@/features/posts/repository/create-post-repository";
import type { PostRepository } from "@/features/posts/repository/post-repository";
import type { CreatePostInput, PostCategory, PostStatus } from "@/types/post";

interface RawCreatePostInput {
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  coverLabel: string;
  publishedAt: string;
  readingTimeInMinutes: string;
  featured: boolean;
  status: string;
  content: string;
}

const categories = new Set<PostCategory>([
  "engineering",
  "product",
  "writing",
  "career",
]);

const statuses = new Set<PostStatus>(["draft", "published"]);

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

  async createPost(input: CreatePostInput) {
    return this.repository.createPost(input);
  }

  parseCreatePostInput(input: RawCreatePostInput): CreatePostInput {
    const title = input.title.trim();
    const excerpt = input.excerpt.trim();
    const coverLabel = input.coverLabel.trim();
    const publishedAt = input.publishedAt.trim();
    const content = input.content
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    const tags = input.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);
    const slug = slugify(input.slug?.trim() || title);
    const readingTimeInMinutes = Number.parseInt(
      input.readingTimeInMinutes,
      10,
    );

    if (!title || !excerpt || !coverLabel || !publishedAt || content.length === 0) {
      throw new Error("Every post field must be filled in before publishing.");
    }

    if (!slug) {
      throw new Error("The generated slug was empty. Please adjust the title.");
    }

    if (!categories.has(input.category as PostCategory)) {
      throw new Error("The selected category was invalid.");
    }

    if (!statuses.has(input.status as PostStatus)) {
      throw new Error("The selected status was invalid.");
    }

    if (!Number.isInteger(readingTimeInMinutes) || readingTimeInMinutes < 1) {
      throw new Error("Reading time must be at least 1 minute.");
    }

    return {
      slug,
      title,
      excerpt,
      category: input.category as PostCategory,
      tags,
      coverLabel,
      publishedAt,
      readingTimeInMinutes,
      featured: input.featured,
      status: input.status as PostStatus,
      content,
    };
  }
}

export const postService = new PostService(createPostRepository());
