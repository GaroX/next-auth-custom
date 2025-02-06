import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith("/_next/") || path.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const authToken = req.cookies.get("authToken")?.value;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && authToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!authToken && path === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/"],
};
