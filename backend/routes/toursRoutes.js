const express = require("express");
const router = express.Router();

const { createTour } = require("../controllers/toursController");
const { validateNewTour } = require("../validators/newTour")

router.route("/").post(validateNewTour, createTour);

module.exports = router;
