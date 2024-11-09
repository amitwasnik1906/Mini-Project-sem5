import mongoose, { Schema } from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    nft:{
      type: Number,
      required: [true, "Please provide id/nft on blockchain"]
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide userId"],
    },
    txHash:{
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Pending",
    },
    seen:{
      type: Boolean,
      default: false
    },
    
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", reportSchema);
