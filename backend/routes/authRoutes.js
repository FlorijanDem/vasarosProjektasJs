const express = require("express");
const router = express.Router();

const { signup, logout, login } = require("../controllers/authController");
const { validateSignup } = require("../validators/signup");
const { validateLogin } = require("../validators/login");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordconfirm:
 *                 type: string
 *     responses:
 *       201:
 *         description: Signup in successfully
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     summary: User logout
 *     tags: [Auth]
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Logout in successfully
 */

router.route("/signup").post(validateSignup, signup);
router.route("/login").post(validateLogin, login);
router.route("/logout").get(logout);

module.exports = router;
