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
