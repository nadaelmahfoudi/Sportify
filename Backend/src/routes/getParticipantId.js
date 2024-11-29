const express = require('express');
const router = express.Router();
const { getParticipantById } = require('../controllers/participantController');

router.get('/:participantId', getParticipantById);
module.exports = router;
