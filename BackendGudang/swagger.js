const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Warehouse Management API',
        version: '1.0.0',
        description: 'API documentation for the Warehouse Management System.',
    },
    servers: [ // Optional: Add server URL for testing in Swagger UI
        {
            url: 'http://localhost:4000',
            description: 'Development server'
        }
    ]
};

const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./server.js'], // Corrected path with glob pattern
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;