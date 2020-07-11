require('dotenv').config();

const PORT = process.env.PORT || 3001;
// eslint-disable-next-line max-len
// Now we are using the port defined in environment variable PORT or port 3001 if the environment variable PORT is undefined
// const PORT = 3001
let { MONGODB_URI } = process.env;
// used to be in and used by note.js
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}
console.log("port is")
console.log(PORT)
console.log("mongodb uri is")
console.log(MONGODB_URI)
module.exports = {
  MONGODB_URI,
  PORT,
};
