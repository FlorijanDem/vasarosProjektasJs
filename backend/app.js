
const express = require('express');
const authRoutes = require('./routes/authRoutes');
// const exampleRoutes = require('./routes/exampleRoutes');
const setupSwagger = require("./utils/swagger");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const toursRoutes = require("./routes/toursRoutes");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}))
setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.use("/api/v1", authRoutes);
app.use("/api/v1/excursions", toursRoutes);

module.exports = app;
