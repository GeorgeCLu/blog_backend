const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'URL 1',
    likes: 1,
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'URL 2',
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Blog 5',
    author: 'Author 5',
    url: 'URL 5',
    likes: 5,
  });
  await blog.save();
  await blog.remove();

  // eslint-disable-next-line no-underscore-dangle
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb,
};
