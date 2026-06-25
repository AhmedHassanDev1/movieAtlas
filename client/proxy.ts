import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.endsWith("/login") ||
    pathname.endsWith("/signup");

  const isProtectedPage = pathname.includes("/editeprofile");

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};