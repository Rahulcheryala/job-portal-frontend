// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Define route groups
// let publicRoutes = new Set([
//   "/",
//   "/seeker-dashboard",
//   "/seeker-dashboard/:jobId/path*",
// ]);

// const loginRoutes = [
//   "/login",
//   "/signup",
//   "/signup-recruiter",
//   "/signup-seeker",
//   "/reset-password",
//   "/reset-password/:path*",
// ];

// const seekerRoutes = [
//   "/seeker-dashboard",
//   "/seeker-dashboard/:jobId/path*",
//   "/appliedJobs",
//   "/profile",
//   "/profile/edit",
// ];

// const hirerRoutes = [
//   "/dashboard",
//   "/post",
//   "/postedJobs",
//   "/postedJobs/:jobId/path*",
//   "/postedJobs/:jobId/edit/:path*",
//   "/payment",
//   "/razorpay",
//   "/profile",
//   "/profile/edit",
// ];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get("access_token")?.value;
//   const account_type = request.cookies.get("account_type")?.value;

//   // Case 1: No token present - Add login routes to public routes
//   if (!token) {
//     // Add login routes to publicRoutes if not already present
//     loginRoutes.forEach((route) => publicRoutes.add(route));
//     // console.log(publicRoutes);
//   }
//   // Case 2: Token is present - Handle based on account type
//   else {
//     if (account_type === "job_seeker") {
//       // Add seeker routes to publicRoutes and remove login routes
//       seekerRoutes.forEach((route) => publicRoutes.add(route));
//       loginRoutes.forEach((route) => publicRoutes.delete(route)); // Remove login routes
//       // console.log(publicRoutes);
//     } else if (account_type === "job_hirer") {
//       // Remove seeker routes and add hirer routes
//       seekerRoutes.forEach((route) => publicRoutes.delete(route));
//       hirerRoutes.forEach((route) => publicRoutes.add(route));

//       // Remove login routes for logged-in hirers
//       loginRoutes.forEach((route) => publicRoutes.delete(route));
//       // console.log(publicRoutes);
//     }
//   }

//   // Convert Set back to an array for pathname checking
//   const publicRoutesArray = Array.from(publicRoutes);

//   // If the user is not logged in
//   if (!token) {
//     // Check if the route is allowed for unauthenticated users
//     if (!publicRoutesArray.some((route) => pathname.startsWith(route))) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   } else {
//     // If the user is logged in as a job seeker
//     if (account_type === "job_seeker") {
//       // If accessing a non-seeker route, redirect to the seeker dashboard
//       if (!publicRoutesArray.some((route) => pathname.startsWith(route))) {
//         return NextResponse.redirect(new URL("/seeker-dashboard", request.url));
//       }
//     }

//     // If the user is logged in as a job hirer
//     if (account_type === "job_hirer") {
//       // If accessing a non-hirer route, redirect to the hirer dashboard
//       if (!publicRoutesArray.some((route) => pathname.startsWith(route))) {
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//       }
//     }
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const loginRoutes = [
  "/login",
  "/signup",
  "/signup-recruiter",
  "/signup-seeker",
  "/reset-password",
  "/reset-password/*",
];

const publicRoutes = ["/", "/seeker-dashboard", "/seeker-dashboard/*"];

const seekerRoutes = [
  "/seeker-dashboard",
  "/seeker-dashboard/*",
  "/appliedJobs",
  "/profile",
  "/profile/edit",
];

const hirerRoutes = [
  "/dashboard",
  "/post",
  "/postedJobs",
  "/postedJobs/*",
  "/payment",
  "/razorpay",
  "/profile",
  "/profile/edit",
];

function matchRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    const pattern = route.replace(/\*/g, ".*");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accountType = request.cookies.get("account_type")?.value;
  const accessToken = request.cookies.get("access_token")?.value;

  // console.log("path", pathname);

  // First check if the route is public
  if (matchRoute(pathname, publicRoutes)) {
    // console.log("public route");
    return NextResponse.next();
  }

  // Then check if the route is a login route
  if (matchRoute(pathname, loginRoutes)) {
    // If user has access token, redirect to appropriate dashboard
    // console.log("login route");
    if (accessToken) {
      // console.log("access token present");
      const redirectUrl =
        accountType === "job_seeker" ? "/seeker-dashboard" : "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    // Otherwise allow access to login routes
    return NextResponse.next();
  }

  // For all other routes, check authentication
  if (!accessToken) {
    // console.log("no access token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle role-based access for authenticated users
  if (accountType === "job_seeker") {
    if (matchRoute(pathname, seekerRoutes)) {
      // console.log("seeker route");
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/seeker-dashboard", request.url));
  }

  if (accountType === "job_hirer") {
    if (matchRoute(pathname, hirerRoutes)) {
      // console.log("hirer route");
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Fallback redirect
  // console.log("fallback redirect");
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
};
