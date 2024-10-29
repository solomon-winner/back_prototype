import express from "express";
import { addBannerCard, updateBannerCard, removeBannerCard, getBannerCards } from "../controllers/bannerCardsController.js";

const router = express.Router();

/**
 * @swagger
 * /api/bannercards:
 *   post:
 *     summary: Add a new banner card
 *     description: Create a new banner card with title and description.
 *     tags: [Banner Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the banner card.
 *                 example: "New Banner Card"
 *               description:
 *                 type: string
 *                 description: The description of the banner card.
 *                 example: "This is a new banner card."
 *     responses:
 *       200:
 *         description: Banner card added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "cards added Successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     BannerCard:
 *                       $ref: '#/components/schemas/BannerCard'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", addBannerCard);

/**
 * @swagger
 * /api/bannercards:
 *   put:
 *     summary: Update a banner card
 *     description: Update the title and description of an existing banner card.
 *     tags: [Banner Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the banner card to update.
 *                 example: "60d0fe4f5311236168a109ca"
 *               title:
 *                 type: string
 *                 description: The new title of the banner card.
 *                 example: "Updated Banner Card"
 *               description:
 *                 type: string
 *                 description: The new description of the banner card.
 *                 example: "This is an updated banner card."
 *     responses:
 *       200:
 *         description: Banner card updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Card updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     card:
 *                       $ref: '#/components/schemas/BannerCard'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Banner card not found
 *       500:
 *         description: Internal server error
 */
router.put("/", updateBannerCard);

/**
 * @swagger
 * /api/bannercards:
 *   get:
 *     summary: Get all banner cards
 *     description: Retrieve a list of all banner cards.
 *     tags: [Banner Cards]
 *     responses:
 *       200:
 *         description: Banner cards fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BannerCard'
 *       500:
 *         description: Internal server error
 */
router.get("/", getBannerCards);

/**
 * @swagger
 * /api/bannercards:
 *   delete:
 *     summary: Delete a banner card
 *     description: Delete an existing banner card by ID.
 *     tags: [Banner Cards]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the banner card to delete.
 *     responses:
 *       200:
 *         description: Banner card deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Card deleted successfully"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Banner card not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", removeBannerCard);

export default router;