const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.get('/:eventId/participants', participantController.getParticipantsByEvent);

// Les autres routes existantes...
module.exports = router;
