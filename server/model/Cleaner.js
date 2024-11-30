// server/model/Cleaner.js

const mongoose = require('mongoose');

const cleanerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    location: { type: String },  
    experiences: { type: Number },
    references: { type: String }, 
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Cleaner', 'Houseowner'], required: true }, // role
    banned: { type: Boolean, default: false } // ban status
});

const Cleaner = mongoose.model("Cleaner", cleanerSchema);

module.exports = Cleaner;