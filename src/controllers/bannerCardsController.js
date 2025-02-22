import BannerCard from "../models/BannerCards.js";
import { bannerCardsdDTO } from "../dtos/bannerCards/bannerCardsDto.js";
import ResponseHelper from "../helpers/responseHelper.js";

export const addBannerCard = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const bannerCard = await BannerCard.create({
      title,
      description,
    });

    return ResponseHelper.success(res, "cards added Successfully", {
      BannerCard: new bannerCardsdDTO(bannerCard),
    });
  } catch (error) {
    next(error);
  }
};

export const getBannerCards = async (req, res, next) => {
  try {
    const bannerCards = await BannerCard.find({});
    const bannerCardsDtos = bannerCards.map(
      (card) => new bannerCardsdDTO(card)
    );
    return ResponseHelper.success(
      res,
      "Banner cards fetched successfully",
      bannerCardsDtos,
    );
  } catch (error) {
    next(error);
  }
};

export const removeBannerCard = async (req, res, next) => {
  try {
    const {id} = req.params;
    const existingCard = await BannerCard.findById(id);
    if (!existingCard) {
      return ResponseHelper.error(res, "Card doesn't exist!", [], 400);
    }
    await BannerCard.findByIdAndDelete(id);

    return ResponseHelper.success(res, "Card deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const updateBannerCard = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const card = await BannerCard.findById(req.params.id);

    if (!card) {
      return ResponseHelper.error(res, "Card not found", [], 404);
    }

    card.title = title;
    card.description = description;

    await card.save();

    return ResponseHelper.success(res, "Card updated successfully", {
      card: new bannerCardsdDTO(card),
    });
  } catch (error) {
    next(error);
  }
};
