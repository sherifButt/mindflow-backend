


const app = require('../app');

describe('Register Controller', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('jwt');
  });

  it('should return an error if email is missing', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({ password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return an error if password is missing', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return an error if email is already registered', async () => {
    // Register a user with the same email first
    await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password123' });

    // Try to register again with the same email
    const response = await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password456' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});





