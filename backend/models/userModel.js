import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: `https://placehold.co/600x400?text=User`,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userModel);
