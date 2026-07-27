import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// Next.js 16 renamed "middleware" to "proxy". Unlike the old Edge-only
// middleware convention, proxy always runs on the Node.js runtime — so it's
// safe to do the full, cryptographically-verified session check here
// (lib/auth.ts uses Node's `crypto` module for HMAC signing).

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;

  const isProtectedPage = pathname.startsWith("/admin/dashboard");
  const isProtectedApi =
    (MUTATING_METHODS.has(req.method) &&
      (pathname.startsWith("/api/attorneys") ||
        pathname.startsWith("/api/staff") ||
        pathname.startsWith("/api/news") ||
        pathname.startsWith("/api/settings"))) ||
    (pathname.startsWith("/api/contact") && req.method !== "POST");

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  if (!verifySessionToken(token)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/api/attorneys/:path*",
    "/api/staff/:path*",
    "/api/news/:path*",
    "/api/settings/:path*",
    "/api/contact/:path*",
  ],
};
