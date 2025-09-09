// lib/sessionOptions.ts
export const sessionOptions = {
  password: process.env.SESSION_PASSWORD || "your-secure-password-here", // Ensure this is a strong, 32+ character secret
  cookieName: "hajj-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
    maxAge: 24 * 60 * 60, // 24 hours (adjust as needed)
  },
};

export type SessionData = {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};