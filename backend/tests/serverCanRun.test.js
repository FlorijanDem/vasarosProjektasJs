const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should respond with OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Server ok');
  });
});
