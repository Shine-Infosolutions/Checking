const Guest = require('../models/Guest');

const getIndianTime = () => {
  return new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
};

exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: 1 });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchGuests = async (req, res) => {
  try {
    const { name } = req.query;
    const guests = await Guest.find({
      name: { $regex: name, $options: 'i' }
    });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkIn = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      {
        checkInTime: getIndianTime(),
        status: 'Ready for Checkout'
      },
      { new: true }
    );
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      {
        checkOutTime: getIndianTime(),
        status: 'Already Checked Out'
      },
      { new: true }
    );
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};