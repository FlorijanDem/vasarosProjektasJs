const express = require('express');
const exampleRoutes = require('./routes/exampleRoutes');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server ok');
});

// Example API routes
app.use('/api/v1', exampleRoutes);

module.exports = app;
