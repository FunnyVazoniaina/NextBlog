import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/config/site";
import { getDatabaseHealth } from "@/lib/mongodb/config";

export async function GET() {
  const database = await getDatabaseHealth();

  return NextResponse.json({
    status: database.status === "connected" ? "ok" : "degraded",
    application: siteConfig.name,
    timestamp: new Date().toISOString(),
    database,
  });
}
