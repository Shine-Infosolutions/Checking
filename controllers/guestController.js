const Guest = require('../models/Guest');

// Helper: format time to IST or device timezone
function formatDateToIST(date) {
  if (!date) return null;
  return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

// GET all guests
exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: 1 });

    // format dates before sending response
    const formatted = guests.map(g => ({
      ...g.toObject(),
      createdAt: formatDateToIST(g.createdAt),
      checkInTime: formatDateToIST(g.checkInTime),
      checkOutTime: formatDateToIST(g.checkOutTime)
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH guests by name
exports.searchGuests = async (req, res) => {
  try {
    const { name } = req.query;
    const guests = await Guest.find({
      name: { $regex: name, $options: 'i' }
    });

    const formatted = guests.map(g => ({
      ...g.toObject(),
      createdAt: formatDateToIST(g.createdAt),
      checkInTime: formatDateToIST(g.checkInTime),
      checkOutTime: formatDateToIST(g.checkOutTime)
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK-IN guest
exports.checkIn = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      {
        checkInTime: new Date(),  // save as UTC
        status: 'Ready for Checkout'
      },
      { new: true }
    );

    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    res.json({
      ...guest.toObject(),
      createdAt: formatDateToIST(guest.createdAt),
      checkInTime: formatDateToIST(guest.checkInTime),
      checkOutTime: formatDateToIST(guest.checkOutTime)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK-OUT guest
exports.checkOut = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      {
        checkOutTime: new Date(), // save as UTC
        status: 'Already Checked Out'
      },
      { new: true }
    );

    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    res.json({
      ...guest.toObject(),
      createdAt: formatDateToIST(guest.createdAt),
      checkInTime: formatDateToIST(guest.checkInTime),
      checkOutTime: formatDateToIST(guest.checkOutTime)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE guest
exports.createGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();

    res.status(201).json({
      ...guest.toObject(),
      createdAt: formatDateToIST(guest.createdAt),
      checkInTime: formatDateToIST(guest.checkInTime),
      checkOutTime: formatDateToIST(guest.checkOutTime)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
