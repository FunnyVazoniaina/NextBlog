import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/config/site";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    application: siteConfig.name,
    timestamp: new Date().toISOString(),
  });
}
