import express from "express";
import {
  addGeneralInfo,
  updateGeneralInfo,
  deleteGeneralInfo,
  getGeneralInfo,
  addSubscribers,
  removeSubscribers,
  addVisitors,
} from "../controllers/generalInfoController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GeneralInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         bannerPic:
 *           type: string
 *           example: "https://example.com/banner.jpg"
 *         bannerInfo:
 *           type: string
 *           example: "This is the banner information."
 *         aboutPic:
 *           type: string
 *           example: "https://example.com/about.jpg"
 *         aboutInfo:
 *           type: string
 *           example: "This is the about information."
 *         visitors:
 *           type: number
 *           example: 100
 *         subscribers:
 *           type: array
 *           items:
 *             type: string
 *           example: ["subscriber1@example.com", "subscriber2@example.com"]
 *         bannerCards:
 *           type: array
 *           items:
 *             type: string
 *           example: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"]
 *         email:
 *           type: string
 *           example: "contact@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 */

/**
 * @swagger
 * /api/general:
 *   post:
 *     summary: Add general information
 *     description: Create a new general information entry.
 *     tags: [General Information]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bannerPic:
 *                 type: string
 *                 description: URL of the banner picture.
 *                 example: "https://example.com/banner.jpg"
 *               bannerInfo:
 *                 type: string
 *                 description: Information about the banner.
 *                 example: "This is the banner information."
 *               aboutPic:
 *                 type: string
 *                 description: URL of the about picture.
 *                 example: "https://example.com/about.jpg"
 *               aboutInfo:
 *                 type: string
 *                 description: Information about the about section.
 *                 example: "This is the about information."
 *     responses:
 *       200:
 *         description: General information added successfully
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
 *                   example: "General information added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     info:
 *                       $ref: '#/components/schemas/GeneralInfo'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", addGeneralInfo);

/**
 * @swagger
 * /api/general/{id}:
 *   put:
 *     summary: Update general information
 *     description: Update existing general information.
 *     tags: [General Information]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bannerPic:
 *                 type: string
 *                 description: URL of the banner picture.
 *                 example: "https://example.com/banner.jpg"
 *               bannerInfo:
 *                 type: string
 *                 description: Information about the banner.
 *                 example: "This is the banner information."
 *               aboutPic:
 *                 type: string
 *                 description: URL of the about picture.
 *                 example: "https://example.com/about.jpg"
 *               aboutInfo:
 *                 type: string
 *                 description: Information about the about section.
 *                 example: "This is the about information."
 *     responses:
 *       200:
 *         description: General information updated successfully
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
 *                   example: "General information updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     info:
 *                       $ref: '#/components/schemas/GeneralInfo'
 *       400:
 *         description: Bad request
 *       404:
 *         description: General information not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateGeneralInfo);

/**
 * @swagger
 * /api/general:
 *   get:
 *     summary: Get general information
 *     description: Retrieve general information.
 *     tags: [General Information]
 *     responses:
 *       200:
 *         description: General information fetched successfully
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
 *                   example: "General information fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     info:
 *                       $ref: '#/components/schemas/GeneralInfo'
 *       404:
 *         description: General information not found
 *       500:
 *         description: Internal server error
 */
router.get("/", getGeneralInfo);

/**
 * @swagger
 * /api/general/visitors:
 *   put:
 *     summary: Increment visitor count
 *     description: Increment the visitor count in the general information.
 *     tags: [General Information]
 *     responses:
 *       200:
 *         description: Visitor count incremented successfully
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
 *                   example: "Visitor count incremented successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     info:
 *                       $ref: '#/components/schemas/GeneralInfo'
 *       404:
 *         description: General information not found
 *       500:
 *         description: Internal server error
 */
router.put("/visitors", addVisitors);

/**
 * @swagger
 * /api/general/{id}:
 *   delete:
 *     summary: Delete general information
 *     description: Delete existing general information by ID.
 *     tags: [General Information]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the general information to delete.
 *     responses:
 *       200:
 *         description: General information deleted successfully
 *       400:
 *         description: General information doesn't exist
 */
router.delete('/:id', deleteGeneralInfo);

export default router;
