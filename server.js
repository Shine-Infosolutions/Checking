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

mongoose.connect('mongodb+srv://singhaditya8052_db_user:Aditya8892@cluster0.h42azqe.mongodb.net/Ashoka_CheckIn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const guestRoutes = require('../Routes/guestRoutes');
app.use('/api/guests', guestRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});