const { body } = require("express-validator");

const validateUpdatedTour = [
  body().notEmpty().withMessage("Request body must contain data"),

  body("title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters")
    .notEmpty()
    .withMessage("Name is required"),

      body("description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Description must be between 3 and 100 characters")
    .notEmpty()
    .withMessage("Description is required"),

  body("photo_url")
    .isLength({ min: 3, max: 1000 })
    .withMessage("photo_url must not be longer than 1000 characters"),

  body("duration")
    .isInt({ min: 1 })
    .withMessage("duration must be a positive integer")
    .notEmpty()
    .withMessage("duration is required")
    .toFloat(),

  body("price")
    .isInt({ min: 1 })
    .withMessage("price must be a positive integer")
    .notEmpty()
    .withMessage("price is required")
    .toFloat(),

  body("category_id")
    .isInt({ min: 1 })
    .withMessage("category_id must be a positive integer")
    .toFloat(),
];

module.exports = { validateUpdatedTour };
