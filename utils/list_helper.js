const dummy = (blogs) => {
  return 1;
};

// https://stackoverflow.com/questions/23247859/better-way-to-sum-a-property-value-in-an-array
// https://stackoverflow.com/questions/50670204/sum-up-array-with-objects
const totalLikes = array => {
  return array.reduce((a, { likes }) => a + likes, 0);
};

const mostLikes = array => {
  return array.reduce((prev, current) => ((+prev.likes > +current.likes) ? prev : current));
};

module.exports = {
  dummy, totalLikes, mostLikes
};

// next part
// https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
