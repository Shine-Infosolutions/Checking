const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

mongoose.connect('mongodb+srv://singhaditya8052_db_user:Aditya8892@cluster0.h42azqe.mongodb.net/Ashoka_CheckIn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const guestRoutes = require('./routes/guestRoutes');
app.use('/api/guests', guestRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});