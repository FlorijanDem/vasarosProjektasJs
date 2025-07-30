const express = require("express");
const { getAllExcursions } = require("../controllers/excursionController");

const router = express.Router();
router.route("/excursions").get(getAllExcursions);

module.exports = router;
