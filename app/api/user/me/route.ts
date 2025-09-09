import { NextResponse } from "next/server";
import getSession from "@/lib/utils/getSession";
import {sessionWithUser} from "@/types";



export async function GET() {
  const session = await getSession() as sessionWithUser;
  return NextResponse.json({ user: session.user || null });
}
