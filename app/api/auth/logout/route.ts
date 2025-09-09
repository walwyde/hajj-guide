// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/sessionOptions";

export async function POST(req: NextRequest) {
  try {
    const session = await getIronSession(req, NextResponse.next(), sessionOptions);

    // Clear all session data
    session.destroy();

    // Create a response to clear the session cookie
    const response = NextResponse.json({ ok: true, message: "Successfully logged out" });

    // Explicitly clear the session cookie
    response.cookies.set(sessionOptions.cookieName, "", {
      maxAge: -1, // Expire the cookie immediately
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}