import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authoritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
    },
    address: {
      type: String,
      required: [true, "Please Enter Your Address"],
    },
    city: {
      type: String,
      required: [true, "Please Enter Your City"],
    },
    state: {
      type: String,
      required: [true, "Please Enter Your State"],
    },
    role: {
      type: String,
      default: "pending",
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

authoritySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

authoritySchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

authoritySchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Authority = mongoose.model("Authority", authoritySchema);
