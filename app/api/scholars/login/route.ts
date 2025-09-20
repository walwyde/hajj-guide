import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Jwt  from "jsonwebtoken"; "jsonwebtoken";
import {dbConnect} from "@/lib/db";
import Scholar from "@/models/Scholar";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // Find scholar
    const scholar = await Scholar.findOne({ email });
    if (!scholar) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, scholar.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update last seen
    scholar.lastSeen = new Date();
    await scholar.save();

    // Generate JWT token
    const token = Jwt.sign(
      { id: scholar._id, email: scholar.email, role: "scholar" },
      process.env.JWT_SECRET || "hajj-guide-secret",
      { expiresIn: "7d" }
    );

    // Set cookie
    const response = NextResponse.json(
      { message: "Login successful", scholar: { id: scholar._id, name: scholar.name, email: scholar.email } },
      { status: 200 }
    );

    response.cookies.set("scholar-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Error logging in scholar:", error);
    return NextResponse.json(
      { message: "Failed to login" },
      { status: 500 }
    );
  }
}