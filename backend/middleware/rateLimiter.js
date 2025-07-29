const rateLimit = require("express-rate-limit");
const { sql } = require("../utils/postgres"); 

const logRateLimitEvent = async (req) => {
  try {
    await sql`
      INSERT INTO logs (ip, endpoint, message)
      VALUES (${req.ip}, ${req.originalUrl}, 'Rate limit exceeded')
    `;
  } catch (err) {
    console.error("Error logging rate limit event:", err);
  }
};

const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,  
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,            
  message: "Too many requests from this IP, please try again later.",    
  statusCode: 429,                                                      
  handler: async (req, res, next, options) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);
    await logRateLimitEvent(req);   
    res.status(options.statusCode).json({ error: options.message });
  },
  standardHeaders: true,   
  legacyHeaders: false,    
});

module.exports = rateLimiter;
