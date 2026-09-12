import { NextResponse } from "next/server";

/*
  Fixed-window in-memory rate limiter for the public form endpoints.
  Why it exists: every registration/contact/newsletter POST also fires
  notification emails, so an unclever loop can burn the Resend quota,
  fill the database with junk, or mass-create payment orders.

  Production runs a single Node process (PM2 fork x1 on the VPS), so
  process memory is sufficient. If the app ever scales to multiple
  instances, move this to Redis/Upstash.
*/

const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function prune(now: number) {
  // Only sweep when the map grows large, so the hot path stays O(1).
  if (buckets.size < 2000) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

/** Returns true when the request is within budget, false when over. */
export function rateLimit(
  request: Request,
  scope: string,
  limit = 10,
  windowMs = 60_000,
): boolean {
  const ip = clientIp(request);
  // Fail open when no client IP is visible (proxies strip headers):
  // throttling the whole world as one bucket would be a self-inflicted DoS.
  if (ip === "unknown") return true;
  prune(Date.now());
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}

export function rateLimitResponse(): NextResponse {
  return NextResponse.json(
    { error: "Too many requests. Please wait a minute and try again." },
    { status: 429 },
  );
}
