const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server ok');
});

// Example API routes
app.use('/api/v1', authRoutes);


module.exports = app;
