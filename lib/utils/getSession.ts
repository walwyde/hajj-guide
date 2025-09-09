// import { getIronSession } from "iron-session";
// import { sessionOptions, SessionData } from "@/lib/sessionOptions";
// import { cookies } from "next/headers";

// export default async function getSession() {
//   try {
//     const cookieData = await cookies();
//     const cookieString = cookieData.toString();
//     // Convert cookies to request-like object
//     const req = { headers: { cookie: cookieString } } as any;
//     const res = {} as any;
//     return getIronSession<SessionData>(req, res, sessionOptions);
    
//   } catch (error) {
//     console.log(error)
//     return null;
//   }
// }

// lib/utils/getSession.ts
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/sessionOptions";

export default async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
