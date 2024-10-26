import mongoose from "mongoose";

const SubscribersSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Subscribers = mongoose.model("Subscribers", SubscribersSchema);

export default Subscribers;