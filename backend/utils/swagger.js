const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation for Node project',
    },
    components: {
        securitySchemes: {
            CookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'jwt',
            },
        },
    },
    security: [
        {
            CookieAuth: [],
        },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  // Path to the API docs
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
