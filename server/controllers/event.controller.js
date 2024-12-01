const Booking = require('../model/Event');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { date, time, additionalInfo, userId, cleanerId } = req.body; 

    if (!userId || !cleanerId) {
        return res.status(400).json({ msg: 'User ID and Cleaner ID are required.' });
    }

    try {
        const newBooking = new Booking({ userId, cleanerId, date, time, additionalInfo });
        await newBooking.save();
        res.status(201).json({ msg: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ msg: 'Error creating booking', error });
    }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
    const userId = req.user.userId; 
    const userRole = req.user.role; 
    console.log("Fetching bookings for user ID:", userId); // Log 

    try {
        let bookings;
        if (userRole === 'Cleaner') {
  
            bookings = await Booking.find({ cleanerId: userId }).populate('userId', 'fullName'); 
        } else {

            bookings = await Booking.find({ userId }).populate('cleanerId', 'fullName');
        }

        console.log("Bookings found:", bookings); // Log 
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ msg: 'Error fetching bookings', error });
    }
};