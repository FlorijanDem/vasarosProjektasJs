const express = require("express");
const router = express.Router();

const { signup, logout, login } = require("../controllers/authController");
const { validateSignup } = require("../validators/signup");
const { validateLogin } = require("../validators/login");

router.route("/signup").post(validateSignup, signup);
router.route("/logout").get(logout);
router.route("/login").post(validateLogin, login);

module.exports = router;
