import mongoose from "mongoose";

const BannerCardsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const BannerCards = mongoose.model("Message", BannerCardsSchema);

export default BannerCards;
