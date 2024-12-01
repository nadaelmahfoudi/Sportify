const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app'); // Adjust path if needed
const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

jest.mock('../models/Event');
jest.mock('../models/User');

describe('POST /api/events/create', () => {
  let userToken;

  beforeAll(async () => {
    const mockUser = {
      _id: 'userId',
      email: 'test@test.com',
      password: 'password123',
    };

    User.findById.mockResolvedValue(mockUser);
    userToken = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET); // Replace with your actual secret key
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new event successfully with a valid token and image', async () => {
    const mockEvent = {
      _id: 'eventId',
      title: 'Sample Event',
      description: 'Sample description',
      date: '2024-12-01',
      location: 'Sample Location',
      user: 'userId',
      image: '/uploads/sample.jpg',
    };

    Event.prototype.save.mockResolvedValue(mockEvent);

    // Ensure the test image file exists
    const mockImagePath = path.resolve('__tests__/mock_image.jpg');
    if (!fs.existsSync(mockImagePath)) {
      console.error('Mock image file not found!');
      return;
    }

    const response = await request(app)
      .post('/api/events/create')
      .set('Authorization', `Bearer ${userToken}`)
      .field('title', 'Sample Event')
      .field('description', 'Sample description')
      .field('date', '2024-12-01')
      .field('location', 'Sample Location')
      .attach('image', mockImagePath); // Make sure the file path is correct

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Event created successfully');
    expect(response.body.event.title).toBe('Sample Event');
    expect(response.body.event.description).toBe('Sample description');
    expect(response.body.event.date).toBe('2024-12-01');
    expect(response.body.event.location).toBe('Sample Location');
    expect(response.body.event.image).toBe('/uploads/sample.jpg');
  });

  it('should return 400 if fields are missing', async () => {
    const response = await request(app)
      .post('/api/events/create')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: '', // Missing title
        description: '', // Missing description
        date: '', // Missing date
        location: '', // Missing location
      });

    expect(response.status).toBe(400); // Expect 400 for missing fields
    expect(response.body.message).toBe('All fields are required');
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .post('/api/events/create')
      .send({
        title: 'Sample Event',
        description: 'Sample description',
        date: '2024-12-01',
        location: 'Sample Location',
        image: '/uploads/sample.jpg', // Optional, you can leave out if needed
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authorization denied. No token provided.');
  });
});

describe('PUT /api/events/:eventId', () => {
    let userToken;
    let eventId;
  
    beforeAll(async () => {
      const mockUser = {
        _id: 'userId',
        email: 'test@test.com',
        password: 'password123',
      };
  
      User.findById.mockResolvedValue(mockUser);
      userToken = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET); // Replace with your actual secret key
  
      // Create a mock event with a save method
      const mockEvent = {
        _id: 'eventId',
        title: 'Old Event',
        description: 'Old description',
        date: '2024-11-01',
        location: 'Old Location',
        user: 'userId',
        image: '/uploads/old_image.jpg',
        save: jest.fn().mockResolvedValue({
          _id: 'eventId',
          title: 'Updated Event',
          description: 'Updated description',
          date: '2024-12-01',
          location: 'Updated Location',
          user: 'userId',
          image: '/uploads/sample.jpg',
        }),
      };
      
      Event.findById.mockResolvedValue(mockEvent);
      Event.prototype.save = mockEvent.save; // Attach save method to prototype
  
      eventId = mockEvent._id; // Capture eventId for test
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update event successfully with valid token and new data', async () => {
      const updatedEventData = {
        title: 'Updated Event',
        description: 'Updated description',
        date: '2024-12-01',
        location: 'Updated Location',
      };
  
      const mockImagePath = path.resolve('__tests__/mock_image.jpg');
      if (!fs.existsSync(mockImagePath)) {
        console.error('Mock image file not found!');
        return;
      }
  
      const response = await request(app)
        .put(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .field('title', updatedEventData.title)
        .field('description', updatedEventData.description)
        .field('date', updatedEventData.date)
        .field('location', updatedEventData.location)
        .attach('image', mockImagePath); // Ensure the mock image is attached
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Event updated successfully');
      expect(response.body.event.title).toBe(updatedEventData.title);
      expect(response.body.event.description).toBe(updatedEventData.description);
      expect(response.body.event.date).toBe(updatedEventData.date);
      expect(response.body.event.location).toBe(updatedEventData.location);
      expect(response.body.event.image).toBe('/uploads/sample.jpg');
    });
  });
  
