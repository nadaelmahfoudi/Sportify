// routes/participantRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { createParticipant, getParticipants } = require('../controllers/participantController');

router.post('/add', authenticate, createParticipant);
router.get('/participants', getParticipants);

module.exports = router;
