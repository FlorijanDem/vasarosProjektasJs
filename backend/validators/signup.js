const { body } = require("express-validator");
const { getUserByEmail } = require("../models/authModel");

const validateSignup = [
  body().notEmpty().withMessage("User body must contain data"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      console.log(value, user)
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*\d).+$/)
    .withMessage("Password must contain at least one number")
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error(
          "Password and password confirmation do not match. Please try again."
        );
      }
      return true;
    }),
];
module.exports = { validateSignup };
