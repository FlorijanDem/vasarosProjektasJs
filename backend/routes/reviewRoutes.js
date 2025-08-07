const express = require("express");
const { getReviewsById } = require("../controllers/reviewController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints for excursion reviews
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
 *         description: Tour ID
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (default: 1)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of reviews per page (default: 4)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of reviews for the specified tour
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
 *                           comment:
 *                             type: string
 *                           rating:
 *                             type: number
 *                           user_id:
 *                             type: integer
 *                           tour_id:
 *                             type: integer
 *                           email:
 *                             type: string
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
 *             example:
 *               status: success
 *               data:
 *                 reviews:
 *                   - id: 1
 *                     comment: "Amazing views and well-organized tour!"
 *                     rating: 5
 *                     user_id: 2
 *                     tour_id: 1
 *                     email: user@example.com
 *                   - id: 2
 *                     comment: "Pretty average, but good value."
 *                     rating: 3
 *                     user_id: 5
 *                     tour_id: 1
 *                     email: another@example.com
 *                 pagination:
 *                   total: 10
 *                   page: 1
 *                   limit: 4
 *                   totalPages: 3
 */

router.route("/:id").get(getReviewsById);

module.exports = router;
