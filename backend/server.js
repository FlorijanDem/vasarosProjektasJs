const app = require('./app');
require('dotenv').config()
const { sql, testConnection} = require('./utils/postgres')
// const { createTables } = require('./createTables');

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await testConnection();
    // await createTables();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }

  process.on('SIGINT', async () => {
    console.log('Closing database connections...');
    await sql.end();
    process.exit(0);
  });
})();