// 'use client';
// export default async function loadClientSession() {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000';
//     const res = await fetch('/api/session', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // Ensure cookies are sent with the request
//       credentials: 'include',
//       // Disable caching to always get the latest session data
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       console.error('Failed to load session:', res.statusText);
//       return null;
//     }

//     const data = await res.json();
//     return data; // { user: ... } or { user: null }
//   } catch (error) {
//     console.error('Error loading session:', error);
//     return null;
//   }
// }

// lib/utils/getSessionFromCookies.ts
import { cookies } from "next/headers";
import { getIronSession, IronSession } from "iron-session";
import { sessionWithUser } from "@/types";

const sessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: process.env.SESSION_NAME || "hajj_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  },
};

/**
 * Enhanced session retrieval for server components with detailed debugging
 */
export const getSessionFromCookies = async (): Promise<IronSession<sessionWithUser> | null> => {
  try {
    console.log("🔍 Starting session retrieval from cookies...");
    console.log("📋 Session options:", {
      cookieName: sessionOptions.cookieName,
      hasPassword: !!sessionOptions.password,
      environment: process.env.NODE_ENV,
      secure: sessionOptions.cookieOptions.secure,
    });

    // Get the cookie store
    const cookieStore = await cookies();
    console.log("🍪 Cookie store retrieved");

    // Check if our session cookie exists
    const sessionCookie = cookieStore.get(sessionOptions.cookieName);
    console.log(`🔎 Looking for cookie: ${sessionOptions.cookieName}`);
    
    if (!sessionCookie) {
      console.log("❌ No session cookie found");
      console.log("🍪 Available cookies:", cookieStore.getAll().map(c => c.name));
      return null;
    }

    console.log("✅ Session cookie found:", {
      name: sessionCookie.name,
      hasValue: !!sessionCookie.value,
      valueLength: sessionCookie.value?.length || 0,
    });

    // Attempt to decode the iron session
    console.log("🔓 Attempting to decode iron session...");
    const session = (await getIronSession(
      cookieStore,
      sessionOptions
    )) as IronSession<sessionWithUser>;

    console.log("🔍 Raw session object:", {
      hasSession: !!session,
      sessionKeys: session ? Object.keys(session) : [],
      hasUser: !!(session as any)?.user,
    });

    // Check if session has user data
    if (!session || typeof session !== 'object') {
      console.log("❌ Session is not a valid object");
      return null;
    }

    const sessionWithUser = session as any;
    if (!sessionWithUser.user) {
      console.log("❌ No user found in session");
      console.log("📄 Session contents:", JSON.stringify(session, null, 2));
      return null;
    }

    console.log("✅ User found in session:", {
      userId: sessionWithUser.user.id,
      userEmail: sessionWithUser.user.email,
      userName: sessionWithUser.user.name,
      hasAllRequiredFields: !!(sessionWithUser.user.id && sessionWithUser.user.email),
    });

    return session;

  } catch (error) {
    console.error("💥 Session retrieval error:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Check for common issues
    if (!process.env.SESSION_PASSWORD) {
      console.error("🚨 SESSION_PASSWORD environment variable is missing!");
    }

    return null;
  }
};

/**
 * Simplified version that just returns the user or null
 */
export const getUserFromCookies = async () => {
  const session = await getSessionFromCookies();
  return session?.user || null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getUserFromCookies();
  return !!user;
};

/**
 * Get user ID from session
 */
export const getUserIdFromCookies = async (): Promise<string | null> => {
  const user = await getUserFromCookies();
  return user?.id || null;
};

export default getSessionFromCookies;