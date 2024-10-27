import express from "express";
import { addTestimony, updateTestimony, removeTestimony, getTestimony, getTestimonies } from "../controllers/TestimonyController.js";

const router = express.Router();

router.post("/", addTestimony);
router.put("/", updateTestimony);
router.get("/", getTestimonies);
router.get("/:id", getTestimony);
router.delete("/", removeTestimony);

export default router;