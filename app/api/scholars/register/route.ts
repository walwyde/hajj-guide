import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {dbConnect} from "@/lib/db";
import Scholar from "@/models/Scholar";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { name, email, password, specialization, institution, bio } = await request.json();

    // Check if scholar already exists
    const existingScholar = await Scholar.findOne({ email });
    if (existingScholar) {
      return NextResponse.json(
        { message: "Scholar with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new scholar
    const newScholar = await Scholar.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      institution,
      bio: bio || "",
      verified: false,
      reviewedSteps: []
    });

    // Return success without password
    const scholar = newScholar.toObject();
    delete scholar.password;

    return NextResponse.json(
      { message: "Scholar registered successfully", scholar },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering scholar:", error);
    return NextResponse.json(
      { message: "Failed to register scholar" },
      { status: 500 }
    );
  }
}