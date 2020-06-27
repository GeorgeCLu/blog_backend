/* eslint-disable arrow-parens */
// The route handlers have also been moved into a dedicated module.
// The event handlers of routes are commonly referred to as controllers,
// and for this reason we have created a new controllers directory.
// All of the routes related to blogs are now in the blogs.js module
// under the controllers directory.
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// get ones stored on modo
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs.map(blog => blog.toJSON()));
  });
});

blogsRouter.post('/', (request, response, next) => {
  // eslint-disable-next-line prefer-destructuring
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON());
    })
    .catch(error => next(error));
});

module.exports = blogsRouter;
