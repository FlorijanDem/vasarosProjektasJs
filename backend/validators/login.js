const { body } = require("express-validator");
const { getUserByEmail } = require("../models/authModel");
const argon2 = require("argon2");

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (!user) {
        throw new Error("User not found, please sign up");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (value, { req }) => {
      const user = await getUserByEmail(req.body.email);
      if (user) {
        const match = await argon2.verify(user.password, value);
        if (!user || !match) {
          throw new Error("Password is incorrect");
        }
      }
      return true;
    }),
];

module.exports = { validateLogin };
