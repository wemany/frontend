import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  PUBLIC_AUTH_ROUTES,
  PUBLIC_BASE_ROUTES,
  PROTECTED_SPECIFIC_ROUTES,
} from "./config/routes";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const { nextUrl, nextauth } = req;
    const { pathname } = nextUrl;
    const token = nextauth?.token;

    if (
      token &&
      PUBLIC_AUTH_ROUTES.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        const matchesRoute = (routeList: (string | RegExp)[]) => {
          return routeList.some((route) => {
            if (typeof route === "string") {
              return pathname.startsWith(route);
            }
            return route.test(pathname);
          });
        };

        if (matchesRoute(PROTECTED_SPECIFIC_ROUTES)) {
          return !!token;
        }

        if (matchesRoute(PUBLIC_AUTH_ROUTES)) {
          return true;
        }

        if (matchesRoute(PUBLIC_BASE_ROUTES)) {
          return true;
        }

        return true;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
