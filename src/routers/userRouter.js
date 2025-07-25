import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", userController.signup);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: 사용자 정보 조회
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 */
router.get("/:id", userController.getUser);

export default router;
