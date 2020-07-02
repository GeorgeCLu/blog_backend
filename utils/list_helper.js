/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

// https://stackoverflow.com/questions/23247859/better-way-to-sum-a-property-value-in-an-array
// https://stackoverflow.com/questions/50670204/sum-up-array-with-objects
const totalLikes = (array) => {
  return array.reduce((a, { likes }) => a + likes, 0);
};

const favoriteBlog = (array) => {
  return array.reduce((prev, current) => ((+prev.likes > +current.likes) ? prev : current));
};

const mostBlogs = (array) => {
  if (array.length === 0) {
    return 0;
  }
  // eslint-disable-next-line no-shadow
  const authorNames = array.map((array) => array.author);
  // https://stackoverflow.com/questions/3783950/get-the-item-that-appears-the-most-times-in-an-array
  const frequency = {}; // array of frequency.
  let max = 0; // holds the max frequency of blogs.
  let result; // holds the max frequency element - author.
  for (let i = 0; i < authorNames.length; i += 1) {
    const author = authorNames[i];
    frequency[author] = (frequency[author] || 0) + 1; // increment frequency.
    if (frequency[author] > max) { // is this frequency > max so far ?
      max = frequency[author]; // update max.
      result = author; // update result.
    }
  }

  return {
    author: result,
    blogs: max,
  };
};

const mostLikes = (array) => {
  if (array.length === 0) {
    return 0;
  }
  // eslint-disable-next-line no-shadow
  // const authorNames = array.map((array) => (array.author));
  // https://stackoverflow.com/questions/3783950/get-the-item-that-appears-the-most-times-in-an-array
  const likesArray = {}; // array of frequency.
  let max = 0; // holds the most likes.
  let result; // holds the autjor with most likes.
  for (let i = 0; i < array.length; i += 1) {
    const entry = array[i];
    const { author, likes } = entry;
    likesArray[author] = (likesArray[author] || 0) + likes; // increment frequency.
    if (likesArray[author] > max) { // is this frequency > max so far ?
      max = likesArray[author]; // update max.
      result = author; // update result.
    }
  }

  return {
    author: result,
    likes: max,
  };
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};

// next part
// https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
