const request = require('supertest');
const app = require('../../app');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

jest.mock('../models/User'); // Mock User model
jest.mock('bcryptjs');       // Mock bcrypt
jest.mock('jsonwebtoken');   // Mock jwt

describe('Auth Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user and return a token', async () => {
      User.findOne.mockResolvedValue(null); // No existing user
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.prototype.save.mockResolvedValue({
        _id: 'userId',
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '123456789',
      });
      jwt.sign.mockReturnValue('jwtToken');

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          phoneNumber: '123456789',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    });

    it('should return 400 if email already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'john@example.com' });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          phoneNumber: '123456789',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already exists');
    });

    it('should return 500 on server error', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          phoneNumber: '123456789',
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Server error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in a user and return a token', async () => {
      const mockUser = {
        _id: 'userId',
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '123456789',
        password: 'hashedPassword',
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('jwtToken');

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 404 if email is not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should return 401 if password is incorrect', async () => {
      User.findOne.mockResolvedValue({ password: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'wrongPassword' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should return 500 on server error', async () => {
      User.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Server error');
    });
  });
});

afterAll(async () => {
    await mongoose.connection.close(); // Assurez-vous de fermer MongoDB après les tests.
  });