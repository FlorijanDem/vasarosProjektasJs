const {sql} = require('../utils/postgres')

exports.createTour = async (newTour) => {
  const tour = await sql`
      INSERT INTO tours ${sql(
        newTour,
        'title',
        'photo_url',
        'duration',
        'dates',
        'price',
        'category_id'
      )}
         RETURNING *;
      `;
  return tour[0];
};

