const app = require('./app');
require('dotenv').config()
<<<<<<< HEAD
const { sql, testConnection} = require('./utils/postgres')
// const { createTables } = require('./createTables');
=======
const { sql, testConnection } = require('./utils/postgres')
const { createTables } = require('./createTables');
>>>>>>> d20467931d5272186d3a6c5e27185aaeb7d79873

const PORT = process.env.PORT || 3000;

const MAX_RETRIES = process.env.MAX_RETRIES || 10;
const RETRY_DELAY_MS = process.env.RETRY_DELAY_MS || 3000;

async function waitForDatabaseConnection(retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔁 Attempting to connect to DB (Attempt ${attempt}/${retries})...`);
      await testConnection();
      console.log('✅ Database connection successful');
      return;
    } catch (error) {
      console.error(`❌ Database connection failed: ${error.message}`);
      if (attempt === retries) {
        throw new Error('Exceeded maximum number of retries to connect to the database');
      }
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}


(async () => {
  try {
<<<<<<< HEAD
    await testConnection();
    // await createTables();
=======
    await waitForDatabaseConnection();
    await createTables();
>>>>>>> d20467931d5272186d3a6c5e27185aaeb7d79873

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