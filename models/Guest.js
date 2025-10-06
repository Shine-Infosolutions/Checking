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
  timestamps: {
    currentTime: () => new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000))
  }
});

module.exports = mongoose.model('Guest', guestSchema);