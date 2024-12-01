const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    typeOfService: {
        type: String,
        enum: ['Deep cleaning', 'Laundry services', 'Carpet cleaning', 'Floor cleaning'],
        required: true,
    },
    houseSize: {
        type: Number,
        required: true, 
    },
    fullName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cleaner', // Reference to the User model
        required: true,
    },
}, { timestamps: true }); // Automatic

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;