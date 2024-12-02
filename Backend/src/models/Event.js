const mongoose = require('mongoose');

// Schéma pour l'événement
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {   
    type: String,
    required: false,  
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
}, {
  timestamps: true, 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
