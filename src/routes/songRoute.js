import express from "express";
import {
  addSong,
  updateSong,
  removeSong,
  getSong,
  getSongs,
} from "../controllers/songController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         title:
 *           type: string
 *           example: "New Song"
 *         youtubeLink:
 *           type: string
 *           example: "https://example.com/song.mp3"
 *         img:
 *           type: string
 *           description: The URL of the uploaded image.
 *           example: "https://example.com/uploads/image.jpg"
 *         albums:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Album 1", "Album 2"]
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
 * /api/songs:
 *   post:
 *     summary: Add a new song
 *     description: Create a new song with title, link, an image file, and albums.
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the song.
 *                 example: "New Song"
 *               youtubeLink:
 *                 type: string
 *                 description: The link to the song.
 *                 example: "https://example.com/song.mp3"
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the song.
 *               albums:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of album names.
 *                 example: ["Album 1", "Album 2"]
 *     responses:
 *       200:
 *         description: Song added successfully
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
 *                   example: "Song added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     song:
 *                       $ref: '#/components/schemas/Song'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/", upload.single('img'), addSong);

/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     summary: Update a song
 *     description: Update the title, link, img, and albums of an existing song.
 *     tags: [Songs]
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
 *               id:
 *                 type: string
 *                 description: The ID of the song to update.
 *                 example: "60d0fe4f5311236168a109ca"
 *               title:
 *                 type: string
 *                 description: The new title of the song.
 *                 example: "Updated Song"
 *               link:
 *                 type: string
 *                 description: The new link to the song.
 *                 example: "https://example.com/song.mp3"
 *               img:
 *                 type: string
 *                 description: The new image URL of the song.
 *                 example: "https://example.com/image.jpg"
 *               albums:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of album names.
 *                 example: ["Album 1", "Album 2"]
 *     responses:
 *       200:
 *         description: Song updated successfully
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
 *                   example: "Song updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     song:
 *                       $ref: '#/components/schemas/Song'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Song not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateSong);

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Get all songs
 *     description: Retrieve a list of all songs.
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Songs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       500:
 *         description: Internal server error
 */
router.get("/", getSongs);

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Get a song by ID
 *     description: Retrieve a song by its ID.
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the song to retrieve.
 *     responses:
 *       200:
 *         description: Song fetched successfully
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
 *                   example: "Song fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     song:
 *                       $ref: '#/components/schemas/Song'
 *       404:
 *         description: Song not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getSong);

/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     summary: Delete a song
 *     description: Delete an existing song by ID.
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the song to delete.
 *     responses:
 *       200:
 *         description: Song deleted successfully
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
 *                   example: "Song deleted successfully"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Song not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", removeSong);

export default router;
