const Event = require('../model/Event');

const createEvent = async (req, res) => {
    try {
      const event = new Event(req.body);
      const savedEvent = await event.save();
      res.status(201).json(savedEvent);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };  

const getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const updateEvent = async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      });
      if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
      res.status(200).json(updatedEvent);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const deleteEvent = async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };




  module.exports = {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent}