import type { Filter, WithId } from "mongodb";

import type { PostRepository } from "@/features/posts/repository/post-repository";
import { getPostsCollection } from "@/lib/mongodb/client";
import type { Post, PostDocument, PostSummary } from "@/types/post";

const publishedPostFilter = {
  status: "published",
} satisfies Filter<PostDocument>;

function normalizePublishedAt(publishedAt: string | Date) {
  if (publishedAt instanceof Date) {
    return publishedAt.toISOString().slice(0, 10);
  }

  return publishedAt;
}

function mapDocumentToPost(document: WithId<PostDocument>): Post {
  return {
    slug: document.slug,
    title: document.title,
    excerpt: document.excerpt,
    category: document.category,
    tags: document.tags,
    coverLabel: document.coverLabel,
    publishedAt: normalizePublishedAt(document.publishedAt),
    readingTimeInMinutes: document.readingTimeInMinutes,
    featured: document.featured,
    status: document.status,
    content: document.content,
  };
}

function mapDocumentToSummary(document: WithId<PostDocument>): PostSummary {
  return {
    slug: document.slug,
    title: document.title,
    excerpt: document.excerpt,
    category: document.category,
    tags: document.tags,
    coverLabel: document.coverLabel,
    publishedAt: normalizePublishedAt(document.publishedAt),
    readingTimeInMinutes: document.readingTimeInMinutes,
    featured: document.featured,
    status: document.status,
  };
}

export class MongoPostRepository implements PostRepository {
  async getPublishedPosts() {
    const collection = await getPostsCollection();
    const documents = await collection
      .find(publishedPostFilter)
      .sort({ publishedAt: -1, _id: -1 })
      .toArray();

    return documents.map(mapDocumentToSummary);
  }

  async getFeaturedPosts() {
    const collection = await getPostsCollection();
    const documents = await collection
      .find({
        ...publishedPostFilter,
        featured: true,
      })
      .sort({ publishedAt: -1, _id: -1 })
      .toArray();

    return documents.map(mapDocumentToSummary);
  }

  async getPublishedPostBySlug(slug: string) {
    const collection = await getPostsCollection();
    const document = await collection.findOne({
      ...publishedPostFilter,
      slug,
    });

    if (!document) {
      return null;
    }

    return mapDocumentToPost(document);
  }
}
