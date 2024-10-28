import BannerCard from "../models/BannerCards.js";
import BannerCardDTO from "../dtos/bannerCards/bannerCardsDto.js";

export const addBannerCard = async (req, res, next) => {
    try {
        const { title, description} = req.body;

        const bannerCard = await BannerCard.create({
        title,
        description,
        });

        return ResponseHelper.success(res,"cards added Successfully",{BannerCard: new BannerCardDTO(bannerCard)}); 
       } catch (error) {
        next(error);
    }
};
export const getBannerCards = async (req, res, next) => {
    try {
        const bannerCards = await BannerCard.find({});
        const bannerCardsDtos = bannerCards.map((card) => new BannerCardDTO(card));
        return ResponseHelper.success(
            res,
            'Banner cards fetched successfully',
            bannerCardsDtos,
        );
    } catch (error) {
        next(error);
    }
};
export const removeBannerCard = async (req, res, next) => {
    try {
        const existingCard = await BannerCard.findById(req.params.id);
        if (!existingCard) {
            return ResponseHelper.error(res, "Card doesn't exist!", [], 400);
        }
        const card = await BannerCard.findByIdAndDelete(req.params.id);

        if (!card) {
            return ResponseHelper.error(res, 'Card not found', [], 404);
        }
        return ResponseHelper.success(res, 'Card deleted successfully');
    } catch (error) {
        next(error);
    }
};
export const updateBannerCard = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const card = await BannerCard.findById(req.params.id);
       
        if (!card) {
            return ResponseHelper.error(res, 'Card not found', [], 404);
        }

        card.title = title;
        card.description = description;

        await card.save();
        
        return ResponseHelper.success(res, 'Card updated successfully', {
            card: new BannerCardDTO(card),
        });
    } catch (error) {
        next(error);
    }
};
