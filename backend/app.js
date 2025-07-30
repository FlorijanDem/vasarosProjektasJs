const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const toursRoutes = require('./routes/toursRoutes')
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}))

app.get('/', (req, res) => {
  res.send('Server ok');
});


app.use('/api/v1', authRoutes);
app.use('/api/v1/excursions', toursRoutes);

module.exports = app;
