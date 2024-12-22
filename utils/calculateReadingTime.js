const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read` ;
  };
  
  module.exports = calculateReadingTime;