const express = require("express");
const authRoutes = require("./routes/authRoutes");
// const exampleRoutes = require('./routes/exampleRoutes');
const setupSwagger = require("./utils/swagger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const loggerMiddleware = require("./middleware/logger");
const rateLimitMiddleware = require("./middleware/rateLimits");

const toursRoutes = require("./routes/toursRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));

app.use(cookieParser());
app.use(express.json());

app.use(loggerMiddleware);

app.use("/api/v1", rateLimitMiddleware);

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.get('/api/v1/test', (req, res) => {
  res.status(200).send('OK');
});

app.use("/api/v1", authRoutes);
app.use("/api/v1/excursions", toursRoutes);

module.exports = app;
