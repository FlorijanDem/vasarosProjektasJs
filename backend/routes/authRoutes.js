const express = require("express");
const router = express.Router();

const {
  createExampleController,
  getExampleByNameController,
} = require("../controllers/exampleController");
const {
  validateCreateExample,
  validateGetExampleByName,
} = require("../validators/exampleValidation");

const { signup, logout, login } = require("../controllers/authController");
const { validateSignup } = require('../validators/signup');

router.route("/signup").post(validateSignup, signup);
router.route("/logout").get(logout);
router.route("/login").post(login);

// POST /examples - create a new example
router.post("/examples", validateCreateExample, createExampleController);

// GET /examples/:name - get examples by name
router.get(
  "/examples/:name",
  validateGetExampleByName,
  getExampleByNameController
);

module.exports = router;
