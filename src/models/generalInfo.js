import mongoose from "mongoose";

const GeneralSchema = new mongoose.Schema({
    bannerPic: {
        type: String,
        required: true,
        trim: true
    },
    bannerInfo: {
        type: String,
        required: true,
        trim: true
    },
    aboutPic: {
        type: String,
        required: true,
        trim: true
    },
    aboutInfo: {
        type: String,
        required: true,
        trim: true
    },
    visitors: {
        type: Number,
        required: true
    },
    subscribers: {
        type: Number,
        required: true
    },
    bannerCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BannerCard',
        required: true
    }],
}, {
    timestamps: true
});

const General = mongoose.model("General", GeneralSchema);

export default General;