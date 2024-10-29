import express from "express";
import { addTestimony, updateTestimony, removeTestimony, getTestimony, getTestimonies } from "../controllers/testimonyController.js";

const router = express.Router();

/**
 * @swagger
 * /api/testimonies:
 *   post:
 *     summary: Add a new testimony
 *     description: Create a new testimony with title and description.
 *     tags: [Testimonies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the testimony.
 *                 example: "New Testimony"
 *               description:
 *                 type: string
 *                 description: The description of the testimony.
 *                 example: "This is a new testimony."
 *     responses:
 *       200:
 *         description: Testimony added successfully
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
 *                   example: "Testimony added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     testimony:
 *                       $ref: '#/components/schemas/Testimony'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", addTestimony);

/**
 * @swagger
 * /api/testimonies:
 *   put:
 *     summary: Update a testimony
 *     description: Update the title and description of an existing testimony.
 *     tags: [Testimonies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the testimony to update.
 *                 example: "60d0fe4f5311236168a109ca"
 *               title:
 *                 type: string
 *                 description: The new title of the testimony.
 *                 example: "Updated Testimony"
 *               description:
 *                 type: string
 *                 description: The new description of the testimony.
 *                 example: "This is an updated testimony."
 *     responses:
 *       200:
 *         description: Testimony updated successfully
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
 *                   example: "Testimony updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     testimony:
 *                       $ref: '#/components/schemas/Testimony'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.put("/", updateTestimony);

/**
 * @swagger
 * /api/testimonies:
 *   get:
 *     summary: Get all testimonies
 *     description: Retrieve a list of all testimonies.
 *     tags: [Testimonies]
 *     responses:
 *       200:
 *         description: Testimonies fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Testimony'
 *       500:
 *         description: Internal server error
 */
router.get("/", getTestimonies);

/**
 * @swagger
 * /api/testimonies/{id}:
 *   get:
 *     summary: Get a testimony by ID
 *     description: Retrieve a testimony by its ID.
 *     tags: [Testimonies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the testimony to retrieve.
 *     responses:
 *       200:
 *         description: Testimony fetched successfully
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
 *                   example: "Testimony fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     testimony:
 *                       $ref: '#/components/schemas/Testimony'
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getTestimony);

/**
 * @swagger
 * /api/testimonies:
 *   delete:
 *     summary: Delete a testimony
 *     description: Delete an existing testimony by ID.
 *     tags: [Testimonies]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the testimony to delete.
 *     responses:
 *       200:
 *         description: Testimony deleted successfully
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
 *                   example: "Testimony deleted successfully"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", removeTestimony);

export default router;