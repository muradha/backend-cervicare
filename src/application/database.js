// eslint-disable-next-line import/no-extraneous-dependencies
import mysql from 'mysql2/promise';

// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

dotenv.config();

const dbUsername = process.env.DATABASE_USERNAME;
const dbHost = process.env.DATABASE_HOST;
const dbName = process.env.DATABASE_NAME;
const dbPort = process.env.DATABASE_PORT;

const connection = mysql.createPool({
  host: dbHost,
  user: dbUsername,
  database: dbName,
  password: process.env.DATABASE_PASSWORD,
  port: dbPort,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default connection;
