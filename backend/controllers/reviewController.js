const {
  getReviewsByIdM,
  getTotalReviewCountM,
  postReview,
} = require("../models/reviewModel");
const { validationResult } = require("express-validator");

exports.getReviewsById = async (req, res, next) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const offset = (page - 1) * limit;

  try {
    const reviews = await getReviewsByIdM(id, limit, offset);
    const total = await getTotalReviewCountM(id);

    res.status(200).json({
      status: "success",
      data: {
        reviews,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.postReview = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.user) {
      return res
        .status(401)
        .json({
          message: "Turite būti prisijungęs, kad parašytumėte atsiliepimą",
        });
    }

    const newReview = {
      ...req.body,
      user_id: req.user.id,
    };

    const createReview = await postReview(newReview);

    res.status(201).json({
      status: "success",
      data: createReview,
    });
  } catch (error) {
    next(error);
  }
};
