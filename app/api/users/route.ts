import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { HAJJ_STEPS } from "@/lib/steps";
import getSession from "@/lib/utils/getSession";

type SessionWithUser = {
  user?: {
    id: string;
    email?: string;
    name?: string;
    role?: "user" | "admin";
  }
}; 

export async function GET() {
  const session = await getSession() as SessionWithUser;
  if (!session.user || session.user.role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await dbConnect();
  const users = await User.find({}).lean();
  const now = Date.now();
  const data = users.map((u: any) => {
    const completedCount = (u.progress || []).filter((p:any)=>p.completed).length;
    const online = u.lastSeen ? (now - new Date(u.lastSeen).getTime()) < 2*60*1000 : false;
    return {
      _id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      lastSeen: u.lastSeen,
      completedCount,
      totalSteps: HAJJ_STEPS.length,
      online
    }
  });
  
  return NextResponse.json({ users: data });
}
