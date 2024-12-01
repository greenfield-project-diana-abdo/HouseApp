
const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/event.controller');
const verifyToken = require('../middleware/auth'); 


const router = express.Router();


router.post('/', verifyToken, createBooking);

router.get('/', verifyToken, getUserBookings);

module.exports = router;