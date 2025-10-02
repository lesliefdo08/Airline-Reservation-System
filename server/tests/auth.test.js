const request = require('supertest');
const app = require('../index');  // Ensure this path is correct!

describe('Auth API tests', () => {
  // Wait for database to initialize
  beforeAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'demo@ars.com', password: 'demo123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('demo@ars.com');
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'wrong@ars.com', password: 'wrong' });
    expect(res.body.success).toBe(false);
  });
});