const express = require("express");
const router = express.Router();

const { signup, logout, login } = require("../controllers/authController");
const { validateSignup } = require('../validators/signup');

router.route("/signup").post(validateSignup, signup);
router.route("/logout").get(logout);
router.route("/login").post(login);


module.exports = router;
