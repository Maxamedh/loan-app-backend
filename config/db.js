const { Sequelize } = require('sequelize');
require('dotenv').config();

// Railway and other hosts inject variables directly into process.env
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT || 3306;

console.log('--- DATABASE DEBUG ---');
console.log('Host:', dbHost || 'NOT FOUND');
console.log('Database:', dbName || 'NOT FOUND');
console.log('User:', dbUser || 'NOT FOUND');
console.log('Port:', dbPort);
console.log('----------------------');

const sequelize = new Sequelize(
  dbName || 'loan_management',
  dbUser || 'root',
  dbPass || '',
  {
    host: dbHost || 'localhost',
    port: dbPort,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000
    }
  }
);

module.exports = sequelize;
