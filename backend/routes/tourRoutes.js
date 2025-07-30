const express = require("express");
const { getAllTours } = require("../controllers/tourController");

const router = express.Router();
router.route("/tours").get(getAllTours);

module.exports = router;
