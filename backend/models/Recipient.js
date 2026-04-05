import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema(
  {
    // BASIC DETAILS
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true },

    height: Number,
    weight: Number,
    bmi: Number,

    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    // ORGAN SELECTION
    organNeeded: {
      type: String,
      enum: ["kidney", "liver", "heart", "lung"],
      required: true,
    },

    // URGENCY
    urgencyLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
    },

    // HOSPITAL & LOCATION
    hospital: {
      name: String,
      city: String,
      state: String,
      doctorName: String,
    },

    matchedDonorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      default: null,
    },

    // ORGAN-SPECIFIC MEDICAL DATA
    organSpecificData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // MEDICAL REPORTS
    reports: [
      {
        reportType: String,
        fileUrl: String,
        uploadedAt: Date,
      },
    ],

    // STATUS
    status: {
      type: String,
      enum: ["waiting", "donor_found", "approved", "rejected"],
      default: "waiting",
    },

    // CONSENT
    consent: {
      type: Boolean,
      required: true,
    },

    // LINK TO USER
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipient", recipientSchema);
