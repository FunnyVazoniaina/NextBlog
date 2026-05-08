import { NextResponse } from "next/server";

import { postService } from "@/features/posts/service/post-service";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const post = await postService.getPublishedPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ message: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ data: post });
}
