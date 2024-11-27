const express = require('express');
const router = express.Router();
const { createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const authenticate = require('../middlewares/authenticate');

// Route to create an event
router.post('/create', authenticate, createEvent);
router.put('/:eventId', authenticate, updateEvent);
router.delete('/:eventId', authenticate, deleteEvent);
module.exports = router;
