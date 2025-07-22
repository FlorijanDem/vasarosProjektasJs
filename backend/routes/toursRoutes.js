const express = require("express");
const router = express.Router();

const { createTour, deleteTour } = require("../controllers/toursController");
const { validateNewTour } = require("../validators/newTour")

router.route("/").post(validateNewTour, createTour);
router.route("/:id").delete(deleteTour);

module.exports = router;
