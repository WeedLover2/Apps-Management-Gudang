const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
const userRoutes = require('./routes/UserRoutes');
const productRoutes = require('./routes/ProductRoutes')
const fileRoutes = require('./routes/FileRoutes')
const authRoutes = require('./routes/AuthRoutes')
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);


// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));