const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Endpoints', () => {
  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
  });

  it('should log in a user', async () => {
    await User.create({ /* ... */ }); 
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});