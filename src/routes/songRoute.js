import express from "express";
import { addSong, updateSong, removeSong, getSong, getSongs } from "../controllers/songController.js";

const router = express.Router();

/**
 * @swagger
 * /api/songs:
 *   post:
 *     summary: Add a new song
 *     description: Create a new song with title and artist.
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the song.
 *                 example: "New Song"
 *               artist:
 *                 type: string
 *                 description: The artist of the song.
 *                 example: "Artist Name"
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
router.post("/", addSong);

/**
 * @swagger
 * /api/songs:
 *   put:
 *     summary: Update a song
 *     description: Update the title and artist of an existing song.
 *     tags: [Songs]
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
 *               artist:
 *                 type: string
 *                 description: The new artist of the song.
 *                 example: "Updated Artist"
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
router.put("/", updateSong);

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
 * /api/songs:
 *   delete:
 *     summary: Delete a song
 *     description: Delete an existing song by ID.
 *     tags: [Songs]
 *     parameters:
 *       - in: query
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
router.delete("/", removeSong);

export default router;