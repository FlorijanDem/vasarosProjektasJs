const { sql } = require("../utils/postgres");

exports.getAllToursM = async () => {
  const toursList = await sql`
        SELECT categories.id, category_name, category_color, category_icon FROM users
        JOIN users_categories
        ON users.id = users_categories.user_id
        JOIN categories 
        ON categories.id = users_categories.category_id
        WHERE users.id = ${userId}
        `;

  return toursList;
};
