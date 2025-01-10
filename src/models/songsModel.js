import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeLink: {
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
    type: {
      type: String,
      required: true,
      enum: ['song', 'album'],
      trim: true,   
    }
  },
  {
    timestamps: true,
  },
);

const Song = mongoose.model("Song", SongSchema);

export default Song;
