const express = require("express");
const { getReviewsById, postReview } = require("../controllers/reviewController");
const router = express.Router();
const protect = require("../middleware/protect");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints for tour reviews
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tour_id:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: text
 *     responses:
 *       201:
 *         description: Reservation created successfully
 */

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get paginated reviews for a specific tour
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tour
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (defaults to 1)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of reviews per page (defaults to 4)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           user_id:
 *                             type: integer
 *                           tour_id:
 *                             type: integer
 *                           rating:
 *                             type: integer
 *                           comment:
 *                             type: string
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                           email:
 *                             type: string
 *                             format: email
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       404:
 *         description: Tour or reviews not found
 */
router.route("/:id").get(getReviewsById);
router.route("/").post(protect, postReview);

module.exports = router;
