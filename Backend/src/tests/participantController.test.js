const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app'); // Ensure this points to your Express app
const Event = require('../models/Event'); // Event model
const Participant = require('../models/Participant'); // Participant model
const jwt = require('jsonwebtoken');

jest.mock('../models/Event'); // Mock Event model
jest.mock('../models/Participant'); // Mock Participant model

describe('POST /api/participants/add', () => {
  let eventData;
  let userToken;

  beforeAll(() => {
    // Mock data for the event
    eventData = {
      _id: new mongoose.Types.ObjectId(),
      title: 'Event Title',
      description: 'Event Description',
    };

    // Mock user and generate JWT token for authorization
    const mockUser = {
      _id: 'userId',
      email: 'test@test.com',
      password: 'password123',
    };

    userToken = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET); // Replace with your actual secret key
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection
  });

  it('should return 404 if the event is not found', async () => {
    // Mock Event.findOne to return null for the non-existent event
    Event.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/participants/add')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'John Doe',
        phoneNumber: '1234567890',
        eventName: 'Non-existent Event', // Event that doesn't exist
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Événement non trouvé');
  });

  it('should create a participant successfully if the event exists', async () => {
    // Mock Event.findOne to return the mock event
    Event.findOne.mockResolvedValue(eventData);
  
    // Mock the Participant save method to resolve successfully
    const newParticipant = {
      name: 'John Doe',
      phoneNumber: '1234567890',
      event: eventData._id,
    };
  
    // Ensure that save resolves with the mock participant
    Participant.prototype.save = jest.fn().mockResolvedValue(newParticipant);
  
    // Make the POST request to create a participant
    const response = await request(app)
      .post('/api/participants/add')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'John Doe',
        phoneNumber: '1234567890',
        eventName: 'Event Title', // Event that exists
      });
  
    // Assert that the response is correct
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Participant ajouté avec succès');
    expect(response.body.participant.name).toBe('John Doe');
    expect(response.body.participant.phoneNumber).toBe('1234567890');
    expect(response.body.participant.event.toString()).toBe(eventData._id.toString());
  });
  

  it('should return 500 if there is an error during participant creation', async () => {
    // Mock Event.findOne to return the mock event
    Event.findOne.mockResolvedValue(eventData);

    // Mock Participant save method to throw an error
    Participant.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/participants/add')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'John Doe',
        phoneNumber: '1234567890',
        eventName: 'Event Title', // Event that exists
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Erreur lors de l’ajout du participant");
    expect(response.body.error).toBe('Database error');
  });
});


describe('PUT /api/participants/:participantId', () => {
    let eventData;
    let participantData;
    let userToken;
    let participantId;
  
    beforeAll(() => {
      // Mock data for the event
      eventData = {
        _id: new mongoose.Types.ObjectId(),
        title: 'Event Title',
        description: 'Event Description',
      };
  
      // Mock data for the participant
      participantData = {
        _id: new mongoose.Types.ObjectId(),
        name: 'John Doe',
        phoneNumber: '1234567890',
        event: eventData._id,
      };
  
      // Mock user and generate JWT token for authorization
      const mockUser = {
        _id: 'userId',
        email: 'test@test.com',
        password: 'password123',
      };
  
      userToken = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET); // Replace with your actual secret key
      participantId = participantData._id.toString();
    });
  
    afterAll(async () => {
      await mongoose.connection.close(); // Close MongoDB connection
    });
  
    it('should return 404 if the event is not found', async () => {
      // Mock Event.findOne to return null for the non-existent event
      Event.findOne.mockResolvedValue(null);
  
      const response = await request(app)
        .put(`/api/participants/${participantId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'John Doe',
          phoneNumber: '1234567890',
          eventName: 'Non-existent Event', // Event that doesn't exist
        });
  
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Event not found');
    });
  
    it('should return 404 if the participant is not found', async () => {
      // Mock Event.findOne to return the mock event
      Event.findOne.mockResolvedValue(eventData);
  
      // Mock Participant.findByIdAndUpdate to return null for the non-existent participant
      Participant.findByIdAndUpdate.mockResolvedValue(null);
  
      const response = await request(app)
        .put(`/api/participants/${participantId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'John Doe',
          phoneNumber: '1234567890',
          eventName: 'Event Title', // Event that exists
        });
  
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Participant not found');
    });
  
    it('should update a participant successfully if the event and participant exist', async () => {
      // Mock Event.findOne to return the mock event
      Event.findOne.mockResolvedValue(eventData);
  
      // Mock Participant.findByIdAndUpdate to return the updated participant
      const updatedParticipant = {
        ...participantData,
        name: 'John Updated',
        phoneNumber: '0987654321', // Mock updated phone number
      };
      Participant.findByIdAndUpdate.mockResolvedValue(updatedParticipant);
  
      const response = await request(app)
        .put(`/api/participants/${participantId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'John Updated',
          phoneNumber: '0987654321', // Expected updated phone number
          eventName: 'Event Title', // Event that exists
        });
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Participant updated successfully');
      expect(response.body.participant.name).toBe('John Updated');
      expect(response.body.participant.phoneNumber).toBe('0987654321');
      expect(response.body.participant.event.toString()).toBe(eventData._id.toString());
    });
  
    it('should return 500 if there is an error during participant update', async () => {
      // Mock Event.findOne to return the mock event
      Event.findOne.mockResolvedValue(eventData);
  
      // Mock Participant.findByIdAndUpdate to throw an error
      Participant.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));
  
      const response = await request(app)
        .put(`/api/participants/${participantId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'John Updated',
          phoneNumber: '0987654321',
          eventName: 'Event Title', // Event that exists
        });
  
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error updating participant');
      expect(response.body.error).toBe('Database error');
    });
  });