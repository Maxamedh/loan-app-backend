const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Routes
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Test Route
app.get('/', (req, res) => {
    res.send('Loan App API is running');
});

// Database Connection and Server Start
const startServer = async () => {
    try {
        console.log('--- Server Starting ---');
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Port Configured:', PORT);

        console.log('Attempting to connect to database...');
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync({ force: false });
        console.log('Database synced.');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('API is ready to receive requests');
        });
    } catch (error) {
        console.error('FATAL ERROR during startup:', error);
        // Exit so Railway knows to restart the container
        process.exit(1);
    }
};

startServer();
