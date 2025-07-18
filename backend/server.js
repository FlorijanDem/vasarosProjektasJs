const app = require('./app');
require('dotenv').config()
const { sql, testConnection} = require('./utils/postgres')

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }

  process.on('SIGINT', async () => {
    console.log('Closing database connections...');
    await sql.end();
    process.exit(0);
  });
})();