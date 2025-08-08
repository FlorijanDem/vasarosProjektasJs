const { body } = require("express-validator");
const { getUserByEmail } = require("../models/authModel");

const validateSignup = [
  body().notEmpty().withMessage("User body must contain data"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom((value) => {
      const basicEmailRegex = /^[^@]+@[^@]+$/;
      if (!basicEmailRegex.test(value)) {
        throw new Error("Email is invalid");
      }
      return true;
    })
    .isLength({ max: 50 })
    .withMessage("Email must not exceed 50 characters")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);
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
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character")
    .custom((value) => {
      const allowedControlChars = ["\n", "\r", "\t", "\b"];
      for (let char of value) {
        const code = char.charCodeAt(0);
        const isAllowed =
          allowedControlChars.includes(char) || (code > 0x1f && code !== 0x20);
        if (!isAllowed) {
          throw new Error(
            "Password contains invalid whitespace or control characters"
          );
        }
      }
      return true;
    })
    .custom((value) => {
      const zalgoChars = value.match(/[\u0300-\u036f]/g);
      if (zalgoChars && zalgoChars.length > 3) {
        throw new Error(
          "Invalid password format: contains corrupted characters (Zalgo text)"
        );
      }
      return true;
    })
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
