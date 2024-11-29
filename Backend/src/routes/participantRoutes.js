// routes/participantRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { createParticipant, updateParticipant, getParticipants, deleteParticipant } = require('../controllers/participantController');

router.post('/add', authenticate, createParticipant);
router.put('/:participantId', authenticate,  updateParticipant);
router.delete('/:participantId', authenticate, deleteParticipant);

router.get('/participants', getParticipants);

module.exports = router;
