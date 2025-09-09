import { NextResponse } from "next/server";
import getSession from "@/lib/utils/getSession";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { IronSession } from "iron-session";
import { sessionWithUser } from "@/types";

export async function POST() {
  try{
  const session = await getSession() as IronSession<sessionWithUser>;
  if (!session.user) return NextResponse.json({ ok: true }); // silent
  await dbConnect();
  await User.findByIdAndUpdate(session.user.id, { $set: { lastSeen: new Date() } });
  return NextResponse.json({ ok: true });
  } catch(error){
    return NextResponse.json({ ok: true }); // silent
  }
}
