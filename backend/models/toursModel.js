const {sql} = require('../utils/postgres')

exports.createTour = async (newTour) => {
  const tour = await sql`
      INSERT INTO tours ${sql(
        newTour,
        '',
      )}
         RETURNING *;
      `;
  return tour[0];
};