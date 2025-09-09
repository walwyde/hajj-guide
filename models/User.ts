import mongoose, { Schema, models, model } from "mongoose";

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  progress: { stepId: string; completed: boolean; quizPassed: boolean; completedAt?: Date }[];
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const ProgressSchema = new Schema({
  stepId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date }
}, { _id: false });

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  progress: { type: [ProgressSchema], default: [] },
  lastSeen: { type: Date, default: null }
}, { timestamps: true });

export default models.User || model("User", UserSchema);
