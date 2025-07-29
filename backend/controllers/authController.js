const { createUser, getUserByEmail } = require("../models/authModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { logAuthEvent } = require("../utils/logger");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const sendTokenCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newUser = req.body;

    const hash = await argon2.hash(newUser.password);
    newUser.password = hash;

    const createdUser = await createUser(newUser);

    if (!createdUser) {
      throw new AppError("User not created", 400);
    }

    const token = signToken(createdUser.id);

    sendTokenCookie(token, res);

    //registration logger
    await logAuthEvent({
      userId: createdUser.id,
      eventType: "registration",
    });

    createdUser.password = undefined;
    createdUser.id = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  try {
    // logout logger
    const token = req.cookies.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await logAuthEvent({
        userId: decoded.id,
        eventType: "logout",
      });
    }

    return res
      .clearCookie("jwt")
      .status(200)
      .json({ message: "You're now logged out." });
  } catch (err) {
    console.error("Logout error;", err);
    return res.status(400).json({ message: "Logout failed." });
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    const token = signToken(user.id);
    sendTokenCookie(token, res);

    //login logger
    await logAuthEvent({
      userId: user.id,
      eventType: "login",
    });

    user.password = undefined;
    user.id = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
