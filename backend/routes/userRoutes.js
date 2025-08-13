const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
} = require("../controllers/userController");
const restrictToAdmin = require("../middleware/restrictToAdmin");
const protect = require("../middleware/protect");
const authMiddleware = require("../middleware/authMiddleware");
const { validateSignup } = require("../validators/signup");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Admin controlls for users
 */

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Create a new users
 *     tags: [Users]
 *     security:
 *       - CookieAuth: []
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
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /api/v1/admin/user/{id}:
 *   delete:
 *     summary: Delete a User by ID
 *     tags: [Users]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *   put:
 *     summary: Update a User by ID
 *     tags: [Users]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */

/**
 * @swagger
 * /api/v1/admin/users/search:
 *   get:
 *     summary: Search
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Search by email
 *     responses:
 *       200:
 *         description: Search results
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               example: success
 *               results:
 *                 type: integer
 *               description: Found
 *               data:
 *                 type: array
 *               items:
 *                 type: object
 *               properties:
 *               id:
 *                 type: integer
 *               email:
 *                 type: string
 *               password:
 *                 type: number
 *               role:
 *                 type: string
 *               created_at:
 *                 type: DATE
 */

router
  .route("/users")
  .get(authMiddleware, protect, restrictToAdmin, getAllUsers)
  .post(authMiddleware, protect, restrictToAdmin, validateSignup, createUser);
router
  .route("/user/:id")
  .put(authMiddleware, protect, restrictToAdmin, validateSignup, updateUser)
  .delete(authMiddleware, protect, restrictToAdmin, deleteUser);
router.route("/users/search").get(authMiddleware, protect, restrictToAdmin, searchUsers);

module.exports = router;
