const express = require("express");
const router = express.Router();

const {
  createTour,
  deleteTour,
  updateTour,
} = require("../controllers/toursController");
const { validateNewTour } = require("../validators/newTour");

router.route("/").post(validateNewTour, createTour);
router.route("/:id").delete(deleteTour).put(updateTour);

module.exports = router;
