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
