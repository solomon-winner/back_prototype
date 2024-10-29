import express from "express";
import { addMessage, updateMessage, removeMessage, getMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Add a new message
 *     description: Create a new message with title and description.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the message.
 *                 example: "New Message"
 *               description:
 *                 type: string
 *                 description: The description of the message.
 *                 example: "This is a new message."
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
 *     description: Update the title and description of an existing message.
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
 *               title:
 *                 type: string
 *                 description: The new title of the message.
 *                 example: "Updated Message"
 *               description:
 *                 type: string
 *                 description: The new description of the message.
 *                 example: "This is an updated message."
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