import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/courses(.*)",
  "/assignments(.*)",
  "/profile(.*)",
  "/certificates(.*)",
  "/roadmap(.*)",
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isProtectedRoute(request)) {
    return;
  }

  await auth.protect({
    unauthenticatedUrl: new URL("/login", request.url).toString(),
  });
});

export const config = {
  // Only run Clerk on protected routes (+ Clerk internals).
  // Do NOT use a catch-all matcher — that runs handshake on public pages like /.
  matcher: [
    "/dashboard(.*)",
    "/courses(.*)",
    "/assignments(.*)",
    "/profile(.*)",
    "/certificates(.*)",
    "/roadmap(.*)",
    "/admin(.*)",
    "/__clerk(.*)",
  ],
};
