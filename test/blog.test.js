const request = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

describe('Blog Endpoints', () => {
  let token;

  beforeAll(async () => {
    
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    token = res.body.token;
  });

  it('should create a new blog', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        body: 'Lorem ipsum dolor sit amet.',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.state).toEqual('draft');
  });
});