const {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../models/reservationModel");
const { validationResult } = require("express-validator");
const AppError = require('../utils/appError');

exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await getAllReservations();

    res.status(200).json({
      status: "success",
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
};

exports.createReservation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newReservation = req.body;

    const createdReservation = await createReservation(newReservation);

    res.status(201).json({
      status: "success",
      data: createdReservation,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateReservation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      throw new AppError("Please provide at least one field to update", 400);
    }

    const updatedReservation = await updateReservation(id, updates);

    if (!updatedReservation) {
      throw new AppError("Invalid id, reservation not found and not updated", 404);
    }

    res.status(200).json({
      status: "success",
      data: updatedReservation,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await deleteReservation(id);

    if (!reservation) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json({
      status: "success",
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};
