const express = require('express');
const router = express.Router();
const { getEventById } = require('../controllers/eventController');

router.get('/:eventId', getEventById);
module.exports = router;
