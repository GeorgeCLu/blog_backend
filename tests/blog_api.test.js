const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);

  // let blogObject = new Blog(helper.initialBlogs[0]);
  // await blogObject.save();

  // blogObject = new Blog(helper.initialBlogs[1]);
  // await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

test('the first blog is about blog 1', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].title).toBe('Blog 1');
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map((r) => r.title);

  expect(contents).toContain(
    'Blog 2',
  );
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Author 3',
    url: 'URL 3',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);

  // const response = await api.get('/api/blogs');

  // const contents = response.body.map((r) => r.title);

  // expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain(
    'Blog 3',
  );
});

test('blog with 0 likes', async () => {
  const newBlog = {
    title: 'Blog 4',
    author: 'Author 4',
    url: 'URL 4',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.likes);

  // const response = await api.get('/api/blogs');

  //  contents = response.body.map((r) => r.likes);

  // expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain(
    0,
  );
});

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'author 0',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  // const blogsAtEnd = await helper.blogsInDb();
  // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

  // const response = await api.get('/api/blogs');

  // expect(response.body).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
