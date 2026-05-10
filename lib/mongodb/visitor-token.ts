import { randomUUID } from "node:crypto";

import type { NextRequest, NextResponse } from "next/server";

export const POST_VOTE_VISITOR_COOKIE = "monblog-visitor-id";

export function getOrCreateVisitorId(request: NextRequest) {
  const existingVisitorId = request.cookies.get(POST_VOTE_VISITOR_COOKIE)?.value;

  if (existingVisitorId) {
    return {
      visitorId: existingVisitorId,
      shouldPersist: false,
    };
  }

  return {
    visitorId: randomUUID(),
    shouldPersist: true,
  };
}

export function persistVisitorId(response: NextResponse, visitorId: string) {
  response.cookies.set(POST_VOTE_VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
