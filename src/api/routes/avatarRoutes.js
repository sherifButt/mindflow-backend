const express = require('express');
const router = express.Router()
const avatarController = require('../controllers/avatarController');

/**
 * @swagger
 * tags:
 *   name: Avatar
 *   description: Avatar management
 */

/**
 * @swagger
 * /avatar/create:
 *   post:
 *     summary: Create a new avatar
 *     tags: [Avatar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *             example:
 *               description: "Avatar for user"
 *     responses:
 *       200:
 *         description: Avatar created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *             example:
 *               id: "1"
 *               imageUrl: "https://example.com/avatar.jpg"
 *               createdAt: "2022-01-01T00:00:00Z"
 *       500:
 *         description: Internal server error
 */
router.post('/avatar/create', avatarController.createAvatar);

/**
 * @swagger
 * /avatar/{id}:
 *   get:
 *     summary: Get avatar by ID
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Avatar ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Avatar found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *             example:
 *               id: "1"
 *               imageUrl: "https://example.com/avatar.jpg"
 *               createdAt: "2022-01-01T00:00:00Z"
 *       404:
 *         description: Avatar not found
 *       500:
 *         description: Internal server error
 */
router.get('/avatar/:id', avatarController.getAvatarById);

module.exports = router;

