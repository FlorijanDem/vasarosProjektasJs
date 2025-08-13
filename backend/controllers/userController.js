const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
} = require("../models/userModel");
const argon2 = require("argon2");
const AppError = require('../utils/appError');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { password, ...userData } = req.body;

    if (!password) {
      const error = new Error("Password is required");
      error.statusCode = 400;
      return next(error);
    }
    const hashedPassword = await argon2.hash(password);

    const userToCreate = {
      ...userData,
      password: hashedPassword,
    };

    const createdUser = await createUser(userToCreate);

    createdUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await argon2.hash(updateData.password);
    }
    const updatedUser = await updateUser(id, updateData);

    if (!updatedUser) {
      throw new AppError("User with this ID was not found", 404);
    }
    updatedUser.password = undefined;

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await deleteUser(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { email } = req.query;
    const users = await searchUsers({ email });
    res.json(users);
  } catch (err) {
    console.error('error', err);
    res.status(500).json({ error: 'server error' });
  }
};
