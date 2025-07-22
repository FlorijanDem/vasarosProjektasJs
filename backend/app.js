const express = require('express');
const authRoutes = require('./routes/authRoutes');
const toursRoutes = require('./routes/toursRoutes')


const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server ok');
});

app.use('/api/v1', authRoutes);
app.use('/api/v1/tours', toursRoutes);


module.exports = app;
