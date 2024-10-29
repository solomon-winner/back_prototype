import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    sm: [{
        type: String,
    }],
}, {
    timestamps: true
});

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;