import express from "express";
import { addMessage, updateMessage, removeMessage, getMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", addMessage);
router.put("/", updateMessage);
router.get("/", getMessages);
router.get("/:id", getMessage);
router.delete("/", removeMessage);

export default router;