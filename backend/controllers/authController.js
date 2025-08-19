const { createUser, getUserByEmail, getUserById } = require("../models/authModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const db = require("../db");
const AppError = require('../utils/appError');
const { addToBlacklistedTokens } = require("../models/blacklistedTokensModel")

const signToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
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

    const token = signToken(createdUser);

    sendTokenCookie(token, res);

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
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const expires_at = new Date(decoded.exp * 1000);

    const toDB = { token, expires_at };
    await addToBlacklistedTokens(toDB);

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(401).json({ message: "Invalid token" });
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
    console.log("User from DB:", user);

    const token = signToken(user);
    sendTokenCookie(token, res);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAuthenticatedUser = async (req, res) => {
  try {
    req.user.password = undefined;
    req.user.id = undefined;
    req.user.created_at = undefined;
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;

    if (!token) {
      throw new AppError(
        'You are not logged in! Please log in to get access.',
        401
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const currentUser = await getUserById(decoded.id);
    if (!currentUser) {
      throw new AppError(
        'The user belonging to this token does no longer exist.',
        401
      );
    }
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};