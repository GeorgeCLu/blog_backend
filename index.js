// contents of the index.js file used for starting the application
// index.js file only imports the actual application from the app.js file
// and then starts the application.
// The function info of the logger-module is used for the console printout
// telling that the application is running.
const http = require('http');
const app = require('./app'); // the actual Express application
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

// app.listen(PORT, () => {
// eslint-disable-next-line no-console
// console.log(`Server running on port ${PORT}`);
// });
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
