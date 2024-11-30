const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  date: { 
    type: Date, 
    required: true 
},
  startTime: { 
    type: String, 
    required: true 
},
  endTime: { 
    type: String, 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);