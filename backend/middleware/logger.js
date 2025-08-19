const logger = {
  info: (msg) => console.log('INFO:', msg),
  error: (msg) => console.error('ERROR:', msg),
};

module.exports = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
