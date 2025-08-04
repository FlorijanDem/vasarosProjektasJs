const express = require('express');
const authRoutes = require('./routes/authRoutes');
const setupSwagger = require('./utils/swagger');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const toursRoutes = require("./routes/toursRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));

app.use(cookieParser());
app.use(express.json());

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Server ok");
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/excursions', toursRoutes);

module.exports = app;
