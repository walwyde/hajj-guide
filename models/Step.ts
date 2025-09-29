// models/Step.ts
import mongoose, { Schema, models, model } from "mongoose";

const MandatorySchema = new Schema({
  tamattu: { type: Boolean, default: false },
  qiran: { type: Boolean, default: false },
  ifrad: { type: Boolean, default: false }
}, { _id: false });

const DuaSchema = new Schema({
  transliteration: String,
  translation: String,
  arabicText: String,
  audioSource: String
}, { _id: false });

const QuranEvidenceSchema = new Schema({
  verse: String,
  reference: String,
  translation: String
}, { _id: false });

const HadithEvidenceSchema = new Schema({
  text: String,
  reference: String,
  narrator: String
}, { _id: false });

const QuizQuestionSchema = new Schema({
  question: String,
  options: [String],
  correct: Number
}, { _id: false });

const QuizSchema = new Schema({
  questions: [QuizQuestionSchema]
}, { _id: false });

const ContentSchema = new Schema({
  overview: String,
  procedure: [String],
  history: String,
  quranEvidence: QuranEvidenceSchema,
  hadithEvidence: HadithEvidenceSchema,
  quiz: QuizSchema,
  audio: String
}, { _id: false });

const StepSchema = new Schema({
  id: { type: String, required: true, unique: true }, // ✅ Your old step ID
  title: { type: String, required: true },
  day: { type: String, required: true },
  description: String,
  mandatory: { tamattu: Boolean, qiran: Boolean, ifrad: Boolean }, // your custom object format
  hajjTypes: [String],
  dua: DuaSchema,
  content: ContentSchema
}, { timestamps: true });


export default models.Step || model("Step", StepSchema);
