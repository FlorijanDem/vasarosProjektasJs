const express = require("express");
const router = express.Router();

const {
  createTour,
  deleteTour,
  updateTour,
} = require("../controllers/toursController");
const { validateNewTour } = require("../validators/newTour");
const { validateUpdatedTour } = require("../validators/updateTour");
const restrictToAdmin = require("../middleware/restrictToAdmin")
const protect = require("../middleware/protect")

router.route("/").post(validateNewTour, createTour);
router.route("/:id").delete(protect ,restrictToAdmin, deleteTour).put(validateUpdatedTour, updateTour);

module.exports = router;
