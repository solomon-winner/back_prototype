import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    sm: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Messages = mongoose.model("Messages", MessageSchema);

export default Messages;
