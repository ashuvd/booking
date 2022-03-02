import * as dotenv from 'dotenv';
dotenv.config();
const config = {
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  host: process.env.HOST || '127.0.0.1',
  port: +process.env.PORT || 3000,
};
export default config;
