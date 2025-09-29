// scripts/seedSteps.ts
import {dbConnect} from "@/lib/db";
import Step from "@/models/Step";
import { HAJJ_STEPS } from "@/lib/steps"; // assuming steps.ts exports the array

export async function seedSteps() {
  try {
    await dbConnect();
    await Step.deleteMany(); // optional: clear existing steps
    await Step.insertMany(HAJJ_STEPS);
    console.log("Steps seeded successfully");
  } catch (error) {
    console.error("Seeding failed", error);
  }
}
