import BannerCard from "../models/BannerCards.js";
import BannerCardDTO from "../dtos/bannerCards/bannerCardsDto.js";

export const addBannerCard = async (req, res) => {
    try {
        const { title, description} = req.body;
        const bannerCard = await BannerCard.create({
        title,
        description,
        });
        return res.status(201).json({ bannerCard });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getBannerCards = async (req, res) => {};
export const removeBannerCard = async (req, res) => {};
export const updateBannerCard = async (req, res) => {};
