import mongoose from "mongoose";

const TestimonySchema = new mongoose.Schema(
  {
    testifierName: {
      type: String,
      required: true,
      trim: true,
    },
    testimony: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    verified: {
      type: String,
      default: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Testimony = mongoose.model("Testimony", TestimonySchema);

export default Testimony;
