const {
  createTour,
  deleteTour,
  updateTour,
  getAllToursM,
  searchAndFilterTours,
} = require("../models/toursModel");
const { validationResult } = require("express-validator");

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

    const newTour = req.body;

    if (
      !newTour ||
      !newTour.title ||
      !newTour.duration ||
      !newTour.dates ||
      !newTour.price ||
      !newTour.category_id
    ) {
      throw new AppError(
        "Missing required fields: title, duration, dates, price, category_id",
        400
      );
    }

    const updatedTour = await updateTour(id, newTour);

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
    // Pakeičiame 'query' į 'title', kad atitiktų modelį ir kriterijus
    const { title, category_id, sortBy, order, page, limit } = req.query;

    const tours = await searchAndFilterTours({
      title,
      // Konvertuojame category_id į skaičių, jei jis egzistuoja
      category_id: category_id ? parseInt(category_id) : undefined,
      sortBy,
      order,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    });

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};