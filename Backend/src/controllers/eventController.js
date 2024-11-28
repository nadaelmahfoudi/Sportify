const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    // Validate required fields
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new event
    const event = new Event({
      title,
      description,
      date,
      location,
      user: req.user.id, 
    });

    // Save the event in the database
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
  
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to update this event' });
      }
  
      if (title) event.title = title;
      if (description) event.description = description;
      if (date) event.date = date;
      if (location) event.location = location;
  
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
      await Event.deleteOne({ _id: eventId });
  
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
