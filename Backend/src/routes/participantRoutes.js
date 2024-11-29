// routes/participantRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { createParticipant, updateParticipant, getParticipants } = require('../controllers/participantController');

router.post('/add', authenticate, createParticipant);
router.put('/:participantId', authenticate,  updateParticipant);
router.get('/participants', getParticipants);

module.exports = router;
