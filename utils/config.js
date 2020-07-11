require('dotenv').config();

// .env file should be used only for local development
// and you shouldn't commit this file to the repository.
// The general practice on Heroku is that you configure your application by
// setting config vars either via Heroku Dashboard or CLI command.
// https://stackoverflow.com/questions/42633403/how-to-access-variables-in-env-file-in-node-js-app-heroku

// Also when deploying project to Heroku, if you don't add .env file to your git repository,
// then you need to give the environmental variables from Config Vars tab like here in the docs
// https://stackoverflow.com/questions/57387809/unable-to-connect-to-mongodb-s-atlas-using-heroku-during-production

// In your heroku project you need to setup an env variable ATLAS_URI
// and enter the value for your mongodb uri.
// To do so go to the settings tab in your heroku app,
// then click on reveal config vars, and then enter the key and value for your mongo uri.
// https://stackoverflow.com/questions/58082890/how-to-load-mongodb-uri-from-env-file-on-heroku

const PORT = process.env.PORT || 3001;
// eslint-disable-next-line max-len
// Now we are using the port defined in environment variable PORT or port 3001 if the environment variable PORT is undefined
// const PORT = 3001
let { MONGODB_URI } = process.env;
// used to be in and used by note.js
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
