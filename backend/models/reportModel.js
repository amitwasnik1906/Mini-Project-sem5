import mongoose, { Schema } from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    victimName: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please Enter Phone number"],
      length: [10, "Phone Number should be 10 digit"]
    },
    abuseType: {
      type: String,
      required: [true, "Please Enter Abuse Type "],
    },
    gender: {
      type: String,
      required: [true, "Please Enter Your Gender"],
    },
    age: {
      type: Number,
      required: [true, "Please Enter Your age"],
    },
    incidentLocation: {
      type: String,
      required: [true, "Please Enter incident Location "],
    },
    incidentCity: {
      type: String,
      required: [true, "Please Enter incident City "],
    },
    incidentState: {
      type: String,
      required: [true, "Please Enter incident State "],
    },
    incidentDate: {
      type: Date,
      required: [true, "Please Enter Incident Date "],
    },
    description: {
      type: String,
      required: [true, "Please Enter Description"],
    },
    evidence: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide userId"],
    },
    seen:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", reportSchema);
