const { Sequelize } = require('sequelize');
require('dotenv').config();

// Debugging: Log the database configuration (without password)
console.log('Database Configuration Attempt:', {
  host: process.env.DB_HOST || 'DEFAULT: localhost',
  user: process.env.DB_USER || 'DEFAULT: root',
  database: process.env.DB_NAME || 'DEFAULT: loan_management',
  port: process.env.DB_PORT || 'DEFAULT: 3306'
});

const sequelize = new Sequelize(
  process.env.DB_NAME || 'loan_management',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      // Some cloud providers require this, we'll keep it flexible
      connectTimeout: 60000
    }
  }
);

module.exports = sequelize;
