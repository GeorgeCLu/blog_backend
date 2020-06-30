const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

// eslint-disable-next-line consistent-return
loginRouter.post('/', async (request, response) => {
  const { body } = request;

  // starts by searching for the user from the database by the username attached to the request
  // Next, it checks the password, also attached to the request.
  // Because the passwords themselves are not
  // saved to the database, but hashes calculated from the passwords,
  // the bcrypt.compare method is used to check if the password is correct:
  const user = await User.findOne({ username: body.username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  // If the password is correct,
  // a token is created with the method jwt.sign.
  // The token contains the username and the user id in a digitally signed form.
  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
