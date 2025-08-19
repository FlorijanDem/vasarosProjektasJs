const request = require('supertest');
const app = require('../app');

describe('Rate Limiting Middleware', () => {
  it('misses requests within the limit', async () => {
    for (let i = 0; i < 5; i++) {
      const res = await request(app).get('/api/v1/test');
      expect(res.statusCode).toBe(200);
    }
  });

  it('blocks requests when the limit is exceeded', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app).get('/api/v1/test');
    }
    const res = await request(app).get('/api/v1/test');
    expect(res.statusCode).toBe(429);
    expect(res.headers).toHaveProperty('retry-after');
  });
});
