import BannerCard from "../models/BannerCards.js";
import BannerCardDTO from "../dtos/bannerCards/bannerCardsDto.js";

export const addBannerCard = async (req, res, next) => {
    try {
        const { title, description} = req.body;
        const bannerCard = await BannerCard.create({
        title,
        description,
        });
        const BannerCard = bannerCard.map(card => new BannerCardDTO(card))
        return ResponseHelper.success(res,"cards Fetched Successfully",BannerCard); 
       } catch (error) {
        next(error);
    }
};
export const getBannerCards = async (req, res) => {};
export const removeBannerCard = async (req, res) => {};
export const updateBannerCard = async (req, res) => {};
