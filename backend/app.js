const express = require('express');
const authRoutes = require('./routes/authRoutes');
// const exampleRoutes = require('./routes/exampleRoutes');
const setupSwagger = require('./utils/swagger');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser())
app.use(express.json());

setupSwagger(app);


app.get('/', (req, res) => {
  res.send('Server ok');
});

// Example API routes
// app.use('/api/v1', exampleRoutes);
app.use('/api/v1', authRoutes);


module.exports = app;
