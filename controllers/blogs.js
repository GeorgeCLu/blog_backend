/* eslint-disable arrow-parens */
// The route handlers have also been moved into a dedicated module.
// The event handlers of routes are commonly referred to as controllers,
// and for this reason we have created a new controllers directory.
// All of the routes related to blogs are now in the blogs.js module
// under the controllers directory.
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// get ones stored on modo
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
  // Blog.find({}).then(blogs => {
  // eslint-disable-next-line indent
    // response.json(blogs.map(blog => blog.toJSON()));
  // });
});

blogsRouter.post('/', async (request, response) => {
  // eslint-disable-next-line prefer-destructuring
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes, // |0 default zero here instead on in schema?
  });

  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());

  /* blog.save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON());
    })
    .catch(error => next(error)); */
});

module.exports = blogsRouter;
