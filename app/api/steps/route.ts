import { NextResponse } from "next/server";
import getSession from "@/lib/utils/getSession";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { HAJJ_STEPS } from "@/lib/steps";
import { IronSession } from "iron-session";
import { sessionWithUser } from "@/types";
import { FlattenMaps } from "mongoose";



export async function GET(req: Request) {
  try {
    const session = await getSession() as sessionWithUser;
    if (!session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
    await dbConnect();
    const user = await User.findById(session.user.id).lean() as FlattenMaps<any>;
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    // Update lastSeen
    await User.findByIdAndUpdate(session.user.id, { lastSeen: new Date() });  
    
    return NextResponse.json({ progress: user?.progress || [], steps: HAJJ_STEPS });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 });

  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { stepId, completed } = await req.json();
    if (!stepId) {
      return NextResponse.json({ error: "stepId required" }, { status: 400 });
    }

    await dbConnect();

    // Try updating existing step first
    const result = await User.updateOne(
      { _id: session.user.id, "progress.stepId": stepId },
      {
        $set: {
          "progress.$.completed": !!completed,
          "progress.$.completedAt": completed ? new Date() : null,
          lastSeen: new Date(),
        },
      }
    );

    // If no existing progress record, push a new one
    if (result.matchedCount === 0) {
      await User.updateOne(
        { _id: session.user.id },
        {
          $push: {
            progress: {
              stepId,
              completed: !!completed,
              completedAt: completed ? new Date() : null,
            },
          },
          $set: { lastSeen: new Date() },
        }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
