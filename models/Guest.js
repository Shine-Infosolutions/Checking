const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  checkInTime: {
    type: Date,
    default: null,
  },
  checkOutTime: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['Not Ready', 'Ready for Checkout', 'Already Checked Out'],
    default: 'Not Ready',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Guest', guestSchema);