/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// The blog.js file under the models directory only defines the Mongoose schema for notes.
// The responsibility of establishing the connection to the database has been given to
// the blog.js module
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

// define specific validation rules for each field in the schema:
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
