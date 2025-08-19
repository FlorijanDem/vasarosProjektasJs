const express = require("express");
// const { get } = require("./authRoutes");
const router = express.Router();
const { getAllCategories } = require("../controllers/categoryController");

router.route("/").get(getAllCategories);

module.exports = router;