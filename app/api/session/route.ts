// // app/api/session/route.ts
// import { NextResponse } from "next/server";
// import getSession from "@/lib/utils/getSession";

// export async function GET() {
//   const session = await getSession();
//   if (!session?.user) {
//     return NextResponse.json({ user: null }, { status: 401 });
//   }
//   return NextResponse.json({ user: session.user }, { status: 200 });
// }

// app/api/session/route.ts
import { NextResponse } from "next/server";
import getSession from "@/lib/utils/getSession";

export async function GET() {
  const session = await getSession();
  if (!session.user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: session.user }, { status: 200 });
}