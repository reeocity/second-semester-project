const calculateReadingTime = (body) => {
  const words = body.split(/\s+/).length;
  const wordsPerMinute = 200; 
  return Math.ceil(words / wordsPerMinute); };

module.exports = calculateReadingTime;
