const express = require('express');
const authRoutes = require('./routes/authRoutes');
const rateLimiter = require('./middleware/rateLimiter');
// const exampleRoutes = require('./routes/exampleRoutes');

const app = express();

app.use(rateLimiter);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server ok');
});

// Example API routes
// app.use('/api/v1', exampleRoutes);
app.use('/api/v1', authRoutes);

module.exports = app;
