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

const { signup } = require("../controllers/authControler");

router.route('/signup').post(signup);

// POST /examples - create a new example
router.post("/examples", validateCreateExample, createExampleController);

// GET /examples/:name - get examples by name
router.get(
  "/examples/:name",
  validateGetExampleByName,
  getExampleByNameController
);

module.exports = router;
