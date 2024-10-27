import express from "express";
import { addSong, updateSong, removeSong, getSong, getSongs } from "../controllers/songController.js";

const router = express.Router();

router.post("/", addSong);
router.put("/", updateSong);
router.get("/", getSongs);
router.get("/:id", getSong);
router.delete("/", removeSong);

export default router;