import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";
import Scholar from "@/models/Scholar";

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get("scholar-token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = Jwt.verify(
      token,
      process.env.JWT_SECRET || "hajj-guide-secret"
    ) as { id: string; email: string; role: string };

    if (!decoded || decoded.role !== "scholar") {
      return NextResponse.json(
        { message: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    // Get scholar from database
    await dbConnect();
    const scholar = await Scholar.findById(decoded.id).select("-password");

    if (!scholar) {
      return NextResponse.json(
        { message: "Unauthorized - Scholar not found" },
        { status: 401 }
      );
    }

    // Update last seen
    scholar.lastSeen = new Date();
    await scholar.save();

    return NextResponse.json(
      { 
        message: "Authenticated",
        scholarId: scholar._id.toString(), // Add scholar ID at the top level
        scholar: { 
          id: scholar._id, 
          name: scholar.name, 
          email: scholar.email,
          specialization: scholar.specialization,
          institution: scholar.institution,
          verified: scholar.verified
        } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 }
    );
  }
}