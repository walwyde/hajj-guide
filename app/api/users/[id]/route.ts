import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import getSession  from "@/lib/utils/getSession";

type SessionWithUser = {
  user?: {
    id: string;
    email?: string;
    name?: string;
    role?: "user" | "admin";
  }
};

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await getSession() as SessionWithUser;
    const {id} = await params;
    if (!session.user || session.user.role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { role } = await req.json();
    if (!['user','admin'].includes(role)) return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    await dbConnect();
    await User.findByIdAndUpdate(id, { $set: { role } });
    return NextResponse.json({ ok: true });
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Server Error" }, { status: 500 });

  }
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await getSession() as SessionWithUser;
  if (!session.user || session.user.role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await dbConnect();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
