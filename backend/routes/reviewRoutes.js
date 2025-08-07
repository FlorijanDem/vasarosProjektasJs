const express = require("express");
const { getReviewsById } = require("../controllers/reviewController");
const router = express.Router();

router.route("/:id").get(getReviewsById);

module.exports = router;
