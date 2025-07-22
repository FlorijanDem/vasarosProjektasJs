const { createTour } = require("../models/toursModel");

exports.createTour = async (req, res, next) => {
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

