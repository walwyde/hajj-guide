import mongoose, { Schema, models, model } from "mongoose";

export type IScholar = {
  _id: string;
  name: string;
  email: string;
  password: string;
  specialization: string;
  institution: string;
  bio: string;
  verified: boolean;
  reviewedSteps: string[];
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const ScholarSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  institution: { type: String, required: true },
  bio: { type: String, default: "" },
  verified: { type: Boolean, default: false },
  reviewedSteps: { type: [String], default: [] },
  lastSeen: { type: Date, default: null }
}, { timestamps: true });

export default models.Scholar || model("Scholar", ScholarSchema);