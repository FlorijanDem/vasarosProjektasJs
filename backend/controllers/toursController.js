const {
  createTour,
  deleteTour,
  updateTour,
  getAllToursM,
  searchAndFilterTours,
  createTourDate,
} = require("../models/toursModel");
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

exports.getAllTours = async (req, res, next) => {
  try {
    const toursList = await getAllToursM();
    res.status(200).json({
      status: "success",
      tours: toursList,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTour = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newTour = req.body;

    const createdTour = await createTour(newTour);

    res.status(201).json({
      status: "success",
      data: createdTour,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tour = await deleteTour(id);

    if (!tour) {
      throw new AppError("tour not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      throw new AppError("Please provide at least one field to update", 400);
    }

    const updatedTour = await updateTour(id, updates);

    if (!updatedTour) {
      throw new AppError("Invalid id, tour not found and not updated", 404);
    }

    res.status(200).json({
      status: "success",
      data: updatedTour,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchTours = async (req, res, next) => {
  try {
    const { title, category_id, sortBy, order, page, limit } = req.query;

    const tours = await searchAndFilterTours({
      title,
      category_id: category_id ? parseInt(category_id, 10) : undefined,
      sortBy,
      order,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    });

    res.status(200).json({
      status: "success",
      results: Array.isArray(tours) ? tours.length : 0,
      data: Array.isArray(tours) ? tours : [],
    });
  } catch (error) {
    console.error("Error in searchTours:", error.message);
    next(error);
  }
};

exports.createTourDate = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newDate = req.body;

    const createdDate = await createTourDate(newDate);

    res.status(201).json({
      status: "success",
      data: createdDate,
    });
  } catch (error) {
    next(error);
  }
};