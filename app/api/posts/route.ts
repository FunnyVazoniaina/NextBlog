import { NextResponse } from "next/server";

import { postService } from "@/features/posts/service/post-service";

export async function GET() {
  const posts = await postService.getPublishedPosts();

  return NextResponse.json({
    data: posts,
    count: posts.length,
  });
}
