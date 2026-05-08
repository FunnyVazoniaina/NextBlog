import type { MetadataRoute } from "next";

import { postService } from "@/features/posts/service/post-service";
import { siteConfig } from "@/lib/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await postService.getPublishedPosts();
  const staticRoutes = ["", "/blog"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date().toISOString(),
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.publishedAt,
    })),
  ];
}
