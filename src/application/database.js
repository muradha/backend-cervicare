// eslint-disable-next-line import/no-extraneous-dependencies
import mysql from 'mysql2/promise';

// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

dotenv.config();

const dbUsername = process.env.DATABASE_USERNAME;
const dbHost = process.env.DATABASE_HOST;
const dbName = process.env.DATABASE_NAME;
const dbPort = process.env.DATABASE_PORT;

const connection = await mysql.createConnection({
  host: dbHost,
  user: dbUsername,
  database: dbName,
  password: process.env.DATABASE_PASSWORD,
  port: dbPort,
});

export default connection;
