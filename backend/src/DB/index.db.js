import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Connection Failed", error);
  }
};

export default connectDB;
