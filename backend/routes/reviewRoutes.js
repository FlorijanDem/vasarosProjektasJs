const express = require("express");
const { getAllReviews } = require("../controllers/reviewController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints for tour reviews
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   review:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   user_id:
 *                     type: integer
 *                   tour_id:
 *                     type: integer
 *             example:
 *               - id: 1
 *                 review: "Amazing tour!"
 *                 rating: 5
 *                 user_id: 2
 *                 tour_id: 3
 *               - id: 2
 *                 review: "It was okay."
 *                 rating: 3
 *                 user_id: 5
 *                 tour_id: 1
 */

router.route("/").get(getAllReviews);

module.exports = router;
