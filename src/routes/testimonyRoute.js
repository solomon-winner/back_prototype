import express from "express";
import {
  addTestimony,
  updateTestimony,
  removeTestimony,
  getTestimony,
  getTestimonies,
} from "../controllers/testimonyController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimony:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         testimony:
 *           type: string
 *           example: "This is a testimony."
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         verified:
 *           type: string
 *           example: "true"
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
 * /api/testimonies:
 *   post:
 *     summary: Add a new testimony
 *     description: Create a new testimony with testimony, email, and verified status.
 *     tags: [Testimonies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testimony:
 *                 type: string
 *                 description: The content of the testimony.
 *                 example: "This is a testimony."
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "user@example.com"
 *               verified:
 *                 type: string
 *                 description: The verification status of the testimony.
 *                 example: "true"
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
 * /api/testimonies/{id}:
 *   put:
 *     summary: Update a testimony
 *     description: Update the content, email, and verification status of an existing testimony.
 *     tags: [Testimonies]
*     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the testimony to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testimony:
 *                 type: string
 *                 description: The new content of the testimony.
 *                 example: "This is an updated testimony."
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "user@example.com"
 *               verified:
 *                 type: string
 *                 description: The new verification status of the testimony.
 *                 example: "true"
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
router.put("/:id", updateTestimony);

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
 * /api/testimonies/{id}:
 *   delete:
 *     summary: Delete a testimony
 *     description: Delete an existing testimony by ID.
 *     tags: [Testimonies]
 *     parameters:
 *       - in: path
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
router.delete("/:id", removeTestimony);

export default router;
