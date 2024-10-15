import mongoose, { Schema } from "mongoose";

const updatesSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Please Provide role"],
    },
    msg: {
      type: String,
      required: [true, "Please Enter Message"],
    },
    reportId: {
      type: Schema.Types.ObjectId,
      ref: "Report",
      required: [true, "Please Provide report Id"],
    },
  },
  {
    timestamps: true,
  }
);

export const Updates = mongoose.model("Updates", updatesSchema);
