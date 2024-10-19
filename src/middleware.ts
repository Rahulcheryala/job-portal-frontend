import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route groups
let publicRoutes = new Set([
  "/",
  "/seeker-dashboard",
  "/seeker-dashboard/:jobId/path*",
]);

const loginRoutes = [
  "/login",
  "/signup",
  "/signup-recruiter",
  "/signup-seeker",
  "/reset-password",
  "/reset-password/:path*",
];

const seekerRoutes = [
  "/seeker-dashboard",
  "/seeker-dashboard/:jobId/path*",
  "/appliedJobs",
  "/profile",
  "/profile/edit",
];

const hirerRoutes = [
  "/dashboard",
  "/post",
  "/postedJobs",
  "/postedJobs/:jobId/path*",
  "/postedJobs/:jobId/edit/:path*",
  "/payment",
  "/razorpay",
  "/profile",
  "/profile/edit",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const account_type = request.cookies.get("account_type")?.value;

  // Case 1: No token present - Add login routes to public routes
  if (!token) {
    // Add login routes to publicRoutes if not already present
    loginRoutes.forEach((route) => publicRoutes.add(route));
    // console.log(publicRoutes);
  }
  // Case 2: Token is present - Handle based on account type
  else {
    if (account_type === "job_seeker") {
      // Add seeker routes to publicRoutes and remove login routes
      seekerRoutes.forEach((route) => publicRoutes.add(route));
      loginRoutes.forEach((route) => publicRoutes.delete(route)); // Remove login routes
      // console.log(publicRoutes);
    } else if (account_type === "job_hirer") {
      // Remove seeker routes and add hirer routes
      seekerRoutes.forEach((route) => publicRoutes.delete(route));
      hirerRoutes.forEach((route) => publicRoutes.add(route));

      // Remove login routes for logged-in hirers
      loginRoutes.forEach((route) => publicRoutes.delete(route));
      // console.log(publicRoutes);
    }
  }

  // Convert Set back to an array for pathname checking
  const publicRoutesArray = Array.from(publicRoutes);

  // If the user is not logged in
  if (!token) {
    // Check if the route is allowed for unauthenticated users
    if (!publicRoutesArray.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // If the user is logged in as a job seeker
    if (account_type === "job_seeker") {
      // If accessing a non-seeker route, redirect to the seeker dashboard
      if (!publicRoutesArray.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/seeker-dashboard", request.url));
      }
    }

    // If the user is logged in as a job hirer
    if (account_type === "job_hirer") {
      // If accessing a non-hirer route, redirect to the hirer dashboard
      if (!publicRoutesArray.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
};
