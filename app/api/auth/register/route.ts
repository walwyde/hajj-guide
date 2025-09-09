import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import getSessions from "@/lib/utils/getSession";
import { HAJJ_STEPS } from "@/lib/steps";
import { sessionWithUser } from "@/types";
import { IronSession } from "iron-session";

export async function POST(req: Request) {
  try {

    const { name, email, password } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  
    await dbConnect();
    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  
    const hash = await bcrypt.hash(password, 10);
    const progress = HAJJ_STEPS.map(s => ({ stepId: s.id, completed: false }));
    const user = await User.create({ name, email, password: hash, role: "user", progress });
  
    const session = await getSessions() as IronSession<sessionWithUser>;

    session.user = { 
      id: user._id.toString(), 
      email: user.email, 
      name: user.name, 
      role: user.role,
      save: async () => {}, // dummy save method to satisfy the type
      destroy: async () => {}, // dummy destroy method to satisfy the type
    };
    await session.save();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
