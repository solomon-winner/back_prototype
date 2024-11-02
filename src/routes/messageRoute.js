import express from "express";
import {
  addMessage,
  updateMessage,
  removeMessage,
  getMessage,
  getMessages,
} from "../controllers/messageController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         message:
 *           type: string
 *           example: "This is a message."
 *         sm:
 *           type: array
 *           items:
 *             type: string
 *           example: ["sm1", "sm2"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Add a new message
 *     description: Create a new message with content and optional sm array.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The content of the message.
 *                 example: "This is a message."
 *               sm:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Optional array of strings.
 *                 example: ["sm1", "sm2"]
 *     responses:
 *       200:
 *         description: Message added successfully
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
 *                   example: "Message added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", addMessage);

/**
 * @swagger
 * /api/messages:
 *   put:
 *     summary: Update a message
 *     description: Update the content and optional sm array of an existing message.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the message to update.
 *                 example: "60d0fe4f5311236168a109ca"
 *               message:
 *                 type: string
 *                 description: The new content of the message.
 *                 example: "This is an updated message."
 *               sm:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Optional array of strings.
 *                 example: ["sm1", "sm2"]
 *     responses:
 *       200:
 *         description: Message updated successfully
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
 *                   example: "Message updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */
router.put("/", updateMessage);

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve a list of all messages.
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Messages fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */
router.get("/", getMessages);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     description: Retrieve a message by its ID.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the message to retrieve.
 *     responses:
 *       200:
 *         description: Message fetched successfully
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
 *                   example: "Message fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getMessage);

/**
 * @swagger
 * /api/messages:
 *   delete:
 *     summary: Delete a message
 *     description: Delete an existing message by ID.
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the message to delete.
 *     responses:
 *       200:
 *         description: Message deleted successfully
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
 *                   example: "Message deleted successfully"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", removeMessage);

export default router;
