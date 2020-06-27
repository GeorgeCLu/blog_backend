require('dotenv').config();

let PORT = process.env.PORT || 3001;
// eslint-disable-next-line max-len
// Now we are using the port defined in environment variable PORT or port 3001 if the environment variable PORT is undefined
// const PORT = 3001
let MONGODB_URI = process.env.MONGODB_URI;
// used to be in and used by note.js

module.exports = {
  MONGODB_URI,
  PORT,
};
