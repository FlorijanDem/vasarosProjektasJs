const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
// const exampleRoutes = require('./routes/exampleRoutes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}))

app.get('/', (req, res) => {
  res.send('Server ok');
});

// Example API routes
// app.use('/api/v1', exampleRoutes);
app.use('/api/v1', authRoutes);


module.exports = app;
