const express = require('express');
const router = express.Router();
const guestController = require('../Controllers/guestController');

router.get('/', guestController.getAllGuests);
router.get('/search', guestController.searchGuests);
router.post('/', guestController.createGuest);
router.put('/:id/checkin', guestController.checkIn);
router.put('/:id/checkout', guestController.checkOut);

module.exports = router;