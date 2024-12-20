const Event = require('../models/Event');
const Participant = require('../models/Participant');
const upload = require('../../app');

// Create a new event
exports.createEvent = async (req, res) => {
    const { title, description, date, location } = req.body;
  
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const event = new Event({
        title,
        description,
        date,
        location,
        user: req.user.id,
        image: req.file ? `/uploads/${req.file.filename}` : '', 
      });
  
      const savedEvent = await event.save();
      res.status(201).json({
        message: 'Event created successfully',
        event: savedEvent,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

exports.getAllEvents = async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json({
        message: 'Events retrieved successfully',
        events,
      });
    } catch (error) {
      console.error('Error retrieving events:', error); // Log de l'erreur
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };  
  
  exports.getEventById = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  exports.updateEvent = async (req, res) => {
    const { title, description, date, location } = req.body;
    const { eventId } = req.params;
  
    // Check for missing required fields
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to update this event' });
      }
  
      // Update event fields only if they are provided
      if (title) event.title = title;
      if (description) event.description = description;
      if (date) event.date = date;
      if (location) event.location = location;
      if (req.file) {
        event.image = `/uploads/${req.file.filename}`;
      }
  
      const updatedEvent = await event.save();
      res.status(200).json({
        message: 'Event updated successfully',
        event: updatedEvent,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  
  exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;
  
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to delete this event' });
      }
      await Participant.deleteMany({ event: eventId });
      await Event.deleteOne({ _id: eventId });
  
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
