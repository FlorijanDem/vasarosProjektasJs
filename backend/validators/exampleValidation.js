const { body, param } = require('express-validator');

// Validation for creating an example
const validateCreateExample = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),
  body('recipe')
    .trim()
    .notEmpty().withMessage('Recipe is required'),
];

// Validation for getting example by name
const validateGetExampleByName = [
  param('name')
    .trim()
    .notEmpty().withMessage('Name parameter is required'),
];

module.exports = {
  validateCreateExample,
  validateGetExampleByName,
};
