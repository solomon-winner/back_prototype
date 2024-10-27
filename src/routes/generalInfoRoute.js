import express from "express";
import { addGeneralInfo, updateGeneralInfo, deleteGeneralInfo, getGeneralInfo } from "../controllers/generalInfoController.js";

const router = express.Router();

router.post("/", addGeneralInfo);
router.put("/", updateGeneralInfo);
router.get("/", getGeneralInfo);
router.delete("/", deleteGeneralInfo);

export default router;