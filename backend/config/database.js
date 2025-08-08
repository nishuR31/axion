import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let con = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database fired up :");
  } catch (error) {
    console.log("Error connecting to database :", error);
  }
};
export default connectDB;
