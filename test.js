const axios = require('axios');
const cheerio = require('cheerio');

function getWordFrequency(url) {
  return axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data);

      const text = $('body').text();

      const words = text.toLowerCase().match(/[a-z]+/g);

      const wordFrequency = new Map();
      words.forEach(word => {
        const count = wordFrequency.get(word) || 0;
        wordFrequency.set(word, count + 1);
      });

      const result = {};
      for (let [word, count] of wordFrequency.entries()) {
        result[word] = count;
      }
      return result;
    })
    .catch(error => {
      console.error(error);
    });
}

const url = 'https://en.wikipedia.org/wiki/Python_(programming_language)';
getWordFrequency(url)
  .then(result => {
    console.log(result);
  });
