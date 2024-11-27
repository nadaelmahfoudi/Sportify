const express = require('express');
const router = express.Router();
const { createEvent, updateEvent } = require('../controllers/eventController');
const authenticate = require('../middlewares/authenticate');

// Route to create an event
router.post('/create', authenticate, createEvent);
router.put('/:eventId', authenticate, updateEvent);
module.exports = router;
