import { NextResponse, type NextRequest } from "next/server";

import { postService } from "@/features/posts/service/post-service";
import { postVoteService } from "@/features/post-votes/service/post-vote-service";
import type { VoteDirection } from "@/features/post-votes/types/post-vote";
import {
  getOrCreateVisitorId,
  persistVisitorId,
} from "@/lib/mongodb/visitor-token";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

function isVoteDirection(value: unknown): value is VoteDirection {
  return value === "up" || value === "down";
}

async function ensurePublishedPost(slug: string) {
  const post = await postService.getPublishedPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ message: "Post not found." }, { status: 404 });
  }

  return null;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const notFoundResponse = await ensurePublishedPost(slug);

  if (notFoundResponse) {
    return notFoundResponse;
  }

  const { visitorId, shouldPersist } = getOrCreateVisitorId(request);
  const summary = await postVoteService.getSummary(slug, visitorId);
  const response = NextResponse.json({ data: summary });

  if (shouldPersist) {
    persistVisitorId(response, visitorId);
  }

  return response;
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const notFoundResponse = await ensurePublishedPost(slug);

  if (notFoundResponse) {
    return notFoundResponse;
  }

  const body = (await request.json().catch(() => null)) as
    | { direction?: unknown }
    | null;

  if (!body || !isVoteDirection(body.direction)) {
    return NextResponse.json(
      { message: "Vote direction must be either 'up' or 'down'." },
      { status: 400 },
    );
  }

  const { visitorId, shouldPersist } = getOrCreateVisitorId(request);

  try {
    const summary = await postVoteService.toggleVote(
      slug,
      visitorId,
      body.direction,
    );
    const response = NextResponse.json({ data: summary });

    if (shouldPersist) {
      persistVisitorId(response, visitorId);
    }

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Voting is unavailable.";

    return NextResponse.json({ message }, { status: 503 });
  }
}
