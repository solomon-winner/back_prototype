import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    albums: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Song = mongoose.model("Song", SongSchema);

export default Song;
