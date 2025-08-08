const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Admin controlls for reservations
 */

/**
 * @swagger
 * /api/v1/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of all reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: numeric
 *               tour_id:
 *                 type: numeric
 *               selected_date:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservation created successfully
 */

/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   delete:
 *     summary: Delete a Reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *   put:
 *     summary: Update a Reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               tour_id:
 *                 type: integer
 *               selected_date:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 */

router.route("/").get(getAllReservations).post(createReservation);
router.route("/:id").put(updateReservation).delete(deleteReservation);

module.exports = router;
