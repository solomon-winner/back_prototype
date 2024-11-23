import express from "express";
import { addVisitors } from "../controllers/visitorscontroller.js";
const router = express.Router();


/**
 * @swagger
 * /api/visitors:
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
router.put("/", addVisitors);

export default router;