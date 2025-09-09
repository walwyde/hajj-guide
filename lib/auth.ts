import { getIronSession } from "iron-session";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type SessionData = {
  user?: {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
  }
}

export const sessionOptions = {
  cookieName: process.env.SESSION_NAME || "hajj_session",
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  try {
    const cookieStore = await cookies();
    // @ts-ignore
    return getIronSession<SessionData>({ cookies: cookieStore }, sessionOptions);

  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}
