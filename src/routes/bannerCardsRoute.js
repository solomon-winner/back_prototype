import express from "express";
import { addBannerCard, updateBannerCard, removeBannerCard,getBannerCards } from "../controllers/bannerCardsController";

const router = express.Router();

router.post("/", addBannerCard);
router.put("/", updateBannerCard);
router.get("/", getBannerCards);
router.delete("/", removeBannerCard);

export default router;