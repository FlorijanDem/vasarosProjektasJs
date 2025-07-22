const express = require("express");
const router = express.Router();

const { createTour } = require("../controllers/toursController");

router.route("/").post(createTour);

module.exports = router;
