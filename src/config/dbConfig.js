import mongoose from "mongoose";

export const dbConfig = async () => {
  const mongoURI = process.env.MONGO_URI;

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error: ", error.message);
    console.log("Stack trace: ", error.stack);
    process.exit(1);
  }
};
