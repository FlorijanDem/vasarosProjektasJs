const express = require('express');
const authRoutes = require('./routes/authRoutes');
const setupSwagger = require('./utils/swagger');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const toursRoutes = require("./routes/toursRoutes");
const adminRoutes = require("./routes/adminRoutes")
const reviewsRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cookieParser());
app.use(express.json());

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

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/excursions', toursRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use("/api/v1/reviews", reviewsRoutes);

module.exports = app;
