// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import { cookies } from "next/headers";
// import { getIronSession, IronSession } from "iron-session";
// import { sessionWithUser } from "@/types";

// // -----------------------------
// // Session Config
// // -----------------------------
// const sessionSecret = process.env.SESSION_PASSWORD;
// if (!sessionSecret) {
//   throw new Error("SESSION_PASSWORD environment variable is not set");
// }

// const sessionOptions = {
//   password: sessionSecret,
//   cookieName: "hajj-session",
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// };

// // -----------------------------
// // POST /api/auth/login
// // -----------------------------
// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();
//     if (!email || !password) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     await dbConnect();
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // -----------------------------
//     // Create / Update session
//     // -----------------------------
//     const cookieStore = await cookies();
//     const session = (await getIronSession(
//       cookieStore,
//       sessionOptions
//     )) as IronSession<sessionWithUser>;

//     // Store only safe data in the session (not password!)
//     session.user = {
//       id: user._id.toString(),
//       email: user.email,
//       name: user.name,
//       role: user.role,
//       save: async () => Promise.resolve(), // Mock save method
//       destroy: async () => Promise.resolve(), // Mock destroy method
//     };

//     await session.save();

//     console.log("User logged in:", session.user);

//     return NextResponse.json({ ok: true, user: session.user });
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/sessionOptions"; // store options in one place
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create a real response object
    const res = NextResponse.json({ ok: true });

    // Attach session to the response so cookie is set
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    await session.save();
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
