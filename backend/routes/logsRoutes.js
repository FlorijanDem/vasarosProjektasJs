const express = require("express");
const router = express.Router();
const {
  getAllLogs,
  getLogs,
  postLog,
} = require("../controllers/logsController");
const restrictToAdmin = require("../middleware/restrictToAdmin");
const protect = require("../middleware/protect");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Admin controls for logs
 */

/**
 * @swagger
 * /api/v1/logs:
 *   get:
 *     summary: Get all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: List of all logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                     nullable: true
 *                   action:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /api/v1/logs/search:
 *   get:
 *     summary: Get logs with optional filters
 *     tags: [Logs]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: created_at_from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for created_at
 *       - in: query
 *         name: created_at_to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for created_at
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Search in description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: A list of logs with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                         nullable: true
 *                       action:
 *                         type: string
 *                       description:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */

router
  .route("/")
  .get(authMiddleware, protect, restrictToAdmin, getAllLogs)
  .post(authMiddleware, protect, restrictToAdmin, postLog);
router.route("/search").get(authMiddleware, protect, restrictToAdmin, getLogs);

module.exports = router;
