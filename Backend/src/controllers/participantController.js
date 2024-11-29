// controllers/participantController.js
const Participant = require('../models/Participant');
const Event = require('../models/Event');

exports.createParticipant = async (req, res) => {
    try {
      const { name, phoneNumber, eventName } = req.body;
  
      // Assurez-vous que req.body fonctionne avec multer
      const event = await Event.findOne({ title: eventName });
      if (!event) {
        return res.status(404).json({ message: 'Événement non trouvé' });
      }
  
      const newParticipant = new Participant({
        name,
        phoneNumber,
        event: event._id,
      });
  
      await newParticipant.save();
      res.status(201).json({ message: 'Participant ajouté avec succès', participant: newParticipant });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l’ajout du participant', error: error.message });
    }
  };

exports.getParticipants = async (req, res) => {
    try {
      const participants = await Participant.find().populate('event');
      res.status(200).json({ participants });
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des participants', error: err.message });
    }
  };

  exports.updateParticipant = async (req, res) => {
    try {
      const { participantId } = req.params; // Get the participant ID from URL
      const { name, phoneNumber, eventName } = req.body;
  
      // Find the event by name
      const event = await Event.findOne({ title: eventName });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Find the participant and update their details
      const updatedParticipant = await Participant.findByIdAndUpdate(
        participantId,
        { name, phoneNumber, event: event._id },
        { new: true }
      );
  
      if (!updatedParticipant) {
        return res.status(404).json({ message: 'Participant not found' });
      }
  
      res.status(200).json({ message: 'Participant updated successfully', participant: updatedParticipant });
    } catch (error) {
      res.status(500).json({ message: 'Error updating participant', error: error.message });
    }
  };
  
  exports.getParticipantById = async (req, res) => {
    try {
      const participantId = req.params.participantId;
  
      // Find participant by ID and populate event details
      const participant = await Participant.findById(participantId).populate('event');
      if (!participant) {
        return res.status(404).json({ message: 'Participant not found' });
      }
  
      res.status(200).json({ participant });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving participant', error: error.message });
    }
  };
