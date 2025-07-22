const { body } = require('express-validator');

const validateNewTour = [
  body().notEmpty().withMessage('Request body must contain data'),

  body('title')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters')
    .notEmpty()
    .withMessage('Name is required'),
























    
  body('price')
    .isInt({ min: 1 })
    .withMessage('price must be a positive integer')
    .notEmpty()
    .withMessage('price is required')
    .toFloat(),

  body('description')
    .isString()
    .withMessage('description must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters')
    .notEmpty()
    .withMessage('description is required'),

  body('category_id')
    .isInt({ min: 1 })
    .withMessage('category_id must be a positive integer')
    .notEmpty()
    .withMessage('category_id is required')
    .toFloat(),
];

module.exports = { validateNewTour };
