import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
import {dbConnect} from "@/lib/db";
import { HAJJ_STEPS } from "@/lib/steps";
import Scholar from "@/models/Scholar";

// Get all steps for scholar review
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Return all steps data
    return NextResponse.json({ steps: HAJJ_STEPS }, { status: 200 });
  } catch (error) {
    console.error("Error fetching steps:", error);
    return NextResponse.json(
      { message: "Failed to fetch steps" },
      { status: 500 }
    );
  }
}

// Update a step (this would typically update a database, but for this implementation
// we'll assume the steps are managed through the file system or another mechanism)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { stepId, updates, scholarId } = await request.json();
    
    // Verify scholar exists and is verified
    const scholar = await Scholar.findById(scholarId);
    if (!scholar || !scholar.verified) {
      return NextResponse.json(
        { message: "Unauthorized scholar" },
        { status: 401 }
      );
    }
    
    // In a real implementation, this would update the step in the database
    // For now, we'll just return success and track that the scholar reviewed this step
    
    // Update scholar's reviewed steps if not already included
    if (!scholar.reviewedSteps.includes(stepId)) {
      scholar.reviewedSteps.push(stepId);
      await scholar.save();
    }
    
    return NextResponse.json(
      { 
        message: "Step updated successfully",
        note: "In a production environment, this would update the actual step data in the database"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating step:", error);
    return NextResponse.json(
      { message: "Failed to update step" },
      { status: 500 }
    );
  }
}