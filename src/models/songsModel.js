import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    youtube_link: {
      type: String,
      trim: true,
    },
    spotifyLink: {
      type: String,
      trim: true,
    },
    appleMusicLink: {
      type: String,
      trim: true,
    },
    amazonLink: {
      type: String,
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
