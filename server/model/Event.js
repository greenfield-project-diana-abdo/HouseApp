const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cleaner', 
        required: true,
    },
    cleanerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cleaner', 
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    additionalInfo: {
        type: String,
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);