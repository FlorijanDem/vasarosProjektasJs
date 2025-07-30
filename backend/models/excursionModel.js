const { sql } = require("../utils/postgres");

exports.getAllExcursionsM = async () => {
  const excursionsList = await sql`
    SELECT 
    tours.*, 
    categories.name AS category_name
    FROM tours
    JOIN categories 
    ON tours.category_id = categories.id;
    `;

  return excursionsList;
};
