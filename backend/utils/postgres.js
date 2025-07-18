const postgres = require("postgres");
require("dotenv").config();

const sql = postgres({
  host: process.env.DB_HOST || "localhost", // change as needed
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "your_database",
  username: process.env.DB_USER || "your_username",
  password: process.env.DB_PASSWORD || "your_password",
});

const testConnection = async () => {
  try {
    await sql`SELECT 1 AS result`;
    console.log("✅ Connection to database successful");
  } catch (error) {
    console.error("❌ Connection to database failed:", error);
    throw error; // Re-throw the error to handle it in the server file
  }
};

module.exports = { sql, testConnection };
