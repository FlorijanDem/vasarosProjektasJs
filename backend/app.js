const express = require("express");
const authRoutes = require("./routes/authRoutes");
const tourRoutes = require("./routes/tourRoutes");
// const exampleRoutes = require('./routes/exampleRoutes');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server ok");
});

// Example API routes
// app.use('/api/v1', exampleRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", tourRoutes);

module.exports = app;
