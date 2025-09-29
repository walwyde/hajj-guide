import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Step from "@/models/Step";
import { seedSteps } from "@/lib/utils/seedSteps";


export async function GET(req: Request, { params }: { params: { stepId: string } }) {
  // await seedSteps();

try {
    const param =  params;
    const { stepId} = await param;

      await dbConnect();
      const step = await Step.findOne({ id: stepId }).lean();
  
      if (!step) {
        return NextResponse.json({ error: "Step not found" }, { status: 404 });
      }
  
      return NextResponse.json(step);
    
   
} catch (error) {
      console.error("Error fetching step:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}