const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://ayo.devhak.com';

const MONGOOSE_URL =
  process.env.NODE_ENV === 'development'
    ? 'mongodb://localhost:27017/streaming'
    : process.env.DB_URL;

module.exports = { CLIENT_URL, MONGOOSE_URL };
