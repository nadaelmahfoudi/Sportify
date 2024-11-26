const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/eventController');
const authenticate = require('../middlewares/authenticate');

// Route to create an event
router.post('/create', authenticate, createEvent);
module.exports = router;
