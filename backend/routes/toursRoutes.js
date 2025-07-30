const express = require("express");
const router = express.Router();

const {
  createTour,
  deleteTour,
  updateTour,
} = require("../controllers/toursController");
const { validateNewTour } = require("../validators/newTour");
const { validateUpdatedTour } = require("../validators/updateTour");
const restrictToAdmin = require("../middleware/restrictToAdmin");
const protect = require("../middleware/protect");
const authMiddleware = require("../middleware/authMiddleware")

router
  .route("/")
  .post(authMiddleware, protect ,restrictToAdmin, validateNewTour, createTour);
router
  .route("/:id")
  .delete(authMiddleware, protect ,restrictToAdmin, deleteTour)
  .put(authMiddleware, protect ,restrictToAdmin, validateUpdatedTour, updateTour);

module.exports = router;
