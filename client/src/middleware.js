// client/src/middleware.js
import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const SESSION_COOKIE_NAME = "session";
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  console.log("🔵 Middleware triggered:", pathname);
  console.log("📦 Cookies:", req.cookies.getAll()); // logs all cookies
  console.log("📌 Session cookie:", sessionCookie ? "[PRESENT]" : "[MISSING]");

  const redirectTo = (dest) => {
    console.log(`➡️ Redirecting to ${dest}`);
    return NextResponse.redirect(new URL(dest, req.url));
  };

  if (!sessionCookie) {
    console.log("🚫 No session cookie → blocking workspace access");
    if (pathname.startsWith("/workspace")) return redirectTo("/");
    return NextResponse.next();
  }

  let role = null;
  try {
    const payload = decodeJwt(sessionCookie);
    console.log("🔑 Decoded JWT payload:", payload);

    role =
      payload.role ||
      payload?.custom?.role ||
      payload?.claims?.role ||
      (payload.roles && payload.roles[0]) ||
      null;

    if (role) role = String(role).toLowerCase();
    console.log("👤 Extracted role:", role);
  } catch (err) {
    console.error("❌ Failed to decode session cookie:", err);
    role = null;
  }

  if (pathname === "/") {
    console.log("🏠 Landing page visited by logged-in user, redirecting...");
    if (role === "hr") return redirectTo("/workspace/hr");
    if (role === "recruiter") return redirectTo("/workspace/recruiter");
    return redirectTo("/");
  }

  if (pathname.startsWith("/workspace/hr") && role !== "hr") {
    console.log("⚠️ Recruiter tried to access HR page → redirecting");
    return redirectTo(`/workspace/${role}`);
  }

  if (pathname.startsWith("/workspace/recruiter") && role !== "recruiter") {
    console.log("⚠️ HR tried to access Recruiter page → redirecting");
    return redirectTo(`/workspace/${role}`);
  }

  console.log("✅ Middleware check passed → continuing request");
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/workspace/:path*"],
};
