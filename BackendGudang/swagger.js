const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Warehouse Management API',
        version: '1.0.0',
        description: 'API documentation for the Warehouse Management System.',
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Development server'
        }
    ]
};

const options = {
    swaggerDefinition,
    // This tells Swagger to scan ALL .js files inside the 'routes' folder
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;