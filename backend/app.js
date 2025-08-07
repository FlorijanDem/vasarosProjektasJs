const express = require("express");
const authRoutes = require("./routes/authRoutes");
// const exampleRoutes = require('./routes/exampleRoutes');
const setupSwagger = require("./utils/swagger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const loggerMiddleware = require("./middleware/logger");
const rateLimitMiddleware = require("./middleware/rateLimits");

const toursRoutes = require("./routes/toursRoutes");
const reviewsRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(loggerMiddleware);

app.use("/api/v1", rateLimitMiddleware);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.get('/api/v1/test', (req, res) => {
  res.status(200).send('OK');
});

app.use("/api/v1", authRoutes);
app.use("/api/v1/excursions", toursRoutes);
app.use("/api/v1/reviews", reviewsRoutes);

module.exports = app;
