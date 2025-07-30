const { sql } = require("./postgres");

async function logAuthEvent({ userId, email, eventType }) {
  try {
    let description = "";

    switch (eventType) {
      case "registration":
        description = `User with ID ${userId} registered`;
        break;
      case "login":
        description = `User with ID ${userId} logged in`;
        break;
      case "logout":
        description = `User with ID ${userId} logged out`;
        break;
      default:
        description = `User with ID ${userId} performed ${eventType}`;
    }

    await sql`
      INSERT INTO logs (user_id, action, description)
      VALUES (${userId}, ${eventType}, ${description});
    `;
  } catch (error) {
    console.error("Logging failed:", error);
  }
}

module.exports = { logAuthEvent };
