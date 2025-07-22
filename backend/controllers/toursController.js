const { createTour, deleteTour } = require("../models/toursModel");
const { validationResult } = require("express-validator");

exports.createTour = async (req, res, next) => {
   const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newTour = req.body;
  
      const createdTour = await createTour(newTour);
  
      res.status(201).json({
        status: 'success',
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
        throw new AppError('tour not found', 404);
      }
  
      res.status(200).json({
        status: 'success',
        data: tour,
      });
    } catch (error) {
      next(error);
    }
  };