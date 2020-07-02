/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-parens */
// The route handlers have also been moved into a dedicated module.
// The event handlers of routes are commonly referred to as controllers,
// and for this reason we have created a new controllers directory.
// All of the routes related to blogs are now in the blogs.js module
// under the controllers directory.
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

// get ones stored on modo
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
  // Blog.find({}).then(blogs => {
  // eslint-disable-next-line indent
    // response.json(blogs.map(blog => blog.toJSON()));
  // });
});

// get individual blog from mongo
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

// eslint-disable-next-line consistent-return
blogsRouter.post('/', async (request, response) => {
  // eslint-disable-next-line prefer-destructuring
  const body = request.body;
  // moved to middleware
  // const token = getTokenFrom(request);
  // The validity of the token is checked with jwt.verify.
  // The method also decodes the token, or returns the Object which the token was based on:
  // The object decoded from the token contains the username and id fields,
  // which tells the server who made the request.
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  // no token, or the object decoded from the token does not contain the users identity
  // (decodedToken.id is undefined),
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  // When the identity of the maker of the request is resolved,
  // the execution continues as before.
  const user = await User.findById(decodedToken.id);
  // old before authentication
  // const user = await User.findById(body.userId);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, // default zero also can be done  in schema?
    user: user._id,
  });
  // unhandled promise rejection, and the request never receives a response.
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog.toJSON());

  /* blog.save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON());
    })
    .catch(error => next(error)); */
});

blogsRouter.put('/:id', async (request, response) => {
  // eslint-disable-next-line prefer-destructuring
  const body = request.body;
  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog.toJSON());

  // old
  /*
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  // added the optional { new: true }parameter, which will cause our event handler to be called
  // with the new modified document instead of the original.

    .then(updatedBlog => {
      response.json(updatedBlog.toJSON());
    })
    // Let's change our handler for creating a new blog
    // so that it passes any potential exceptions to the error handler middleware:
    .catch(error => next(error)); */
});

// eslint-disable-next-line consistent-return
blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
