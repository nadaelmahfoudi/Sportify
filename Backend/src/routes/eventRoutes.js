const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createEvent, updateEvent, deleteEvent, getAllEvents } = require('../controllers/eventController');
const authenticate = require('../middlewares/authenticate');

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only images are allowed (jpg, jpeg, png)!'));
    }
    cb(null, true);
  },
});

// Route to create an event with image upload
router.post('/create', authenticate, upload.single('image'), createEvent);
router.put('/:eventId', authenticate, upload.single('image'), updateEvent);
router.delete('/:eventId', authenticate, deleteEvent);
router.get('/events', getAllEvents);

module.exports = router;
