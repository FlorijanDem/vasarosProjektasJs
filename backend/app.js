<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
=======
const express = require("express");
const authRoutes = require("./routes/authRoutes");
>>>>>>> d20467931d5272186d3a6c5e27185aaeb7d79873
// const exampleRoutes = require('./routes/exampleRoutes');
const setupSwagger = require("./utils/swagger");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const toursRoutes = require("./routes/toursRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));

app.use(cookieParser());
app.use(express.json());

<<<<<<< HEAD
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}))
=======
setupSwagger(app);
>>>>>>> d20467931d5272186d3a6c5e27185aaeb7d79873

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.use("/api/v1", authRoutes);
app.use("/api/v1/excursions", toursRoutes);

module.exports = app;
