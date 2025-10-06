const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://checking-alpha.vercel.app'],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const guestRoutes = require('./routes/guestRoutes');
app.use('/api/guests', guestRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;