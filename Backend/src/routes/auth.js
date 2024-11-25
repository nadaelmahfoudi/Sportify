const express = require('express');
const { register } = require('../controllers/authController');

const router = express.Router();

// Route pour l'inscription
router.post('/register', register);

module.exports = router;
