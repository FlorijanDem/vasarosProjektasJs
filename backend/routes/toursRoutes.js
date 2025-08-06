const express = require("express");
const router = express.Router();

const {
  createTour,
  deleteTour,
  updateTour,
  getAllTours,
  searchTours,
} = require("../controllers/toursController");
const { validateNewTour } = require("../validators/newTour");
const { validateUpdatedTour } = require("../validators/updateTour");
const restrictToAdmin = require("../middleware/restrictToAdmin");
const protect = require("../middleware/protect");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Excursions
 *   description: Excursion management endpoints
 */

/**
 * @swagger
 * /api/v1/excursions:
 *   get:
 *     summary: Get all excursions
 *     tags: [Excursions]
 *     responses:
 *       200:
 *         description: List of all excursions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Create a new excursions
 *     tags: [Excursions]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               photo_url:
 *                 type: string
 *               duration:
 *                 type: number
 *               dates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *               price:
 *                 type: number
 *               category_id:
 *                 type: integer
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Excursion created successfully
 */

/**
 * @swagger
 * /api/v1/excursions/{id}:
 *   delete:
 *     summary: Delete a Excursion by ID
 *     tags: [Excursions]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Excursion ID
 *     responses:
 *       200:
 *         description: Excursion deleted successfully
 *   put:
 *     summary: Update a Excursion by ID
 *     tags: [Excursions]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Excursion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               photo_url:
 *                 type: string
 *               duration:
 *                 type: number
 *               dates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *               price:
 *                 type: number
 *               category_id:
 *                 type: integer
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Excursion updated successfully
 */

/**
 * @swagger
 * /api/v1/excursions/search:
 *   get:
 *     summary: Search and Filter Excursions
 *     tags: [Excursions]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by title
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Category ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         enum: [title, price]
 *         description: SORT (title, price)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         enum: [asc, dsc]
 *         description: SORT (asc, desc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Result limit to page
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
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 */

router.route("/search").get(searchTours);

router
  .route("/")
  .get(getAllTours)
  .post(authMiddleware, protect, restrictToAdmin, validateNewTour, createTour);

router
  .route("/:id")
  .delete(authMiddleware, protect, restrictToAdmin, deleteTour)
  .put(
    authMiddleware,
    protect,
    restrictToAdmin,
    validateUpdatedTour,
    updateTour
  );


module.exports = router;
