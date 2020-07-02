const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// eslint-disable-next-line consistent-return
usersRouter.post('/', async (request, response) => {
  // eslint-disable-next-line prefer-destructuring
  const body = request.body;
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password is shorter than the minimum allowed length' });
  }
  const saltRounds = 10;
  // generate and store password hashes
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  if (user) {
    response.json(user.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = usersRouter;
