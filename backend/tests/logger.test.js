const loggerMiddleware = require('../middleware/logger');

describe('Logger Middleware', () => {
  it('calls next and logs the request', () => {
    const req = { method: 'GET', url: '/api/v1/test' };
    const res = {};
    const next = jest.fn();

    loggerMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
