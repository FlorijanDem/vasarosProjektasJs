const { sql } = require("../utils/postgres");
const db = require("../db");

exports.getAllCategoriesM = async () => {
  const categoriesList = await sql`
    SELECT * FROM categories;
    `;
  return categoriesList;
};