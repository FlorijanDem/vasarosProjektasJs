const { sql, testConnection } = require("./utils/postgres");

async function createTables() {
  try {
    // Table categories
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `;

    // Table users
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Table tours
    await sql`
      CREATE TABLE IF NOT EXISTS tours (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        photo_url TEXT,
        duration INTERVAL,
        price NUMERIC(10, 2) NOT NULL,
        category_id INTEGER,
        description VARCHAR(200),
        location VARCHAR(200),
        view_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT tours_category_id_fkey FOREIGN KEY (category_id)
          REFERENCES categories(id)
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
      );
    `;

    // Tour dates
    await sql`
      CREATE TABLE IF NOT EXISTS tours_dates (
      id SERIAL PRIMARY KEY,
      tour_id INTEGER NOT NULL,
      date DATE NOT NULL,
      CONSTRAINT tours_dates_tour_id_fkey FOREIGN KEY (tour_id)
        REFERENCES tours(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
    `;

    // Table registrations
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        tour_id INTEGER,
        selected_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT registrations_user_id_fkey FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON UPDATE NO ACTION
          ON DELETE CASCADE,
        CONSTRAINT registrations_tour_id_fkey FOREIGN KEY (tour_id)
          REFERENCES tours(id)
          ON UPDATE NO ACTION
          ON DELETE CASCADE
      );
    `;

    // Table reviews
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        tour_id INTEGER,
        rating INTEGER,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON UPDATE NO ACTION
          ON DELETE CASCADE,
        CONSTRAINT reviews_tour_id_fkey FOREIGN KEY (tour_id)
          REFERENCES tours(id)
          ON UPDATE NO ACTION
          ON DELETE CASCADE
      );
    `;

    // Table Logs
    await sql`
      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        action VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT logs_user_id_fkey FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
      );
    `;

    console.log("✅ All tables created successfully!");
  } catch (error) {
    console.error("❌ Error while creating tables:", error);
  }
}

module.exports = { createTables };
