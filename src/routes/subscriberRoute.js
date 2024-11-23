import express from "express";
import { addSubscribers, removeSubscribers } from "../controllers/subscriberController.js";
const router = express.Router()


/**
 * @swagger
 * /api/subscriber/:
 *   post:
 *     summary: Add a subscriber
 *     description: Add a new subscriber.
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriber:
 *                 type: string
 *                 description: The email of the subscriber.
 *                 example: "subscriber@example.com"
 *     responses:
 *       200:
 *         description: Subscriber added successfully
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
 *                   example: "Subscriber added successfully!"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subscribers not found
 *       500:
 *         description: Internal server error
 */
router.post("/", addSubscribers);

/**
 * @swagger
 * /api/subscriber/:
 *   put:
 *     summary: Remove a subscriber
 *     description: Remove a Subscribers.
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriber:
 *                 type: string
 *                 description: The email of the subscriber to remove.
 *                 example: "subscriber@example.com"
 *     responses:
 *       200:
 *         description: Subscriber removed successfully
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
 *                   example: "Subscriber removed successfully!"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subscribers not found
 *       500:
 *         description: Internal server error
 */
router.put("/", removeSubscribers);

export default router;