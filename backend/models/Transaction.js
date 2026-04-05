import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipient",
      required: true
    },
    organType: {
      type: String,
      enum: ["kidney", "liver", "heart", "lung"],
      required: true
    },
    status: {
      type: String,
      enum: ["chatting", "recipient_accepted", "donor_approved", "confirmed", "cancelled"],
      default: "chatting"
    },
    chatHistory: {
      type: [
        {
          sender: { type: String, enum: ["recipient", "donor"], required: true },
          message: { type: String, required: true },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    },
    assignedAt: Date,
    completedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
