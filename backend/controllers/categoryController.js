// import { getAllCategoriesM } from "../models/categoryModel";
const { getAllCategoriesM } = require("../models/categoryModel");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categoryList = await getAllCategoriesM();
    res.status(200).json({
      status: "success",
      categories: categoryList,
    });
  } catch (error) {
    next(error);
  }
};
