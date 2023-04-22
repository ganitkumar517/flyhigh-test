const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  const url = req.body.url;

  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const words = $('body').text().split(' ');
      const wordCounts = {};
      
      for (const word of words) {
        if (word in wordCounts) {
          wordCounts[word] += 1;
        } else {
          wordCounts[word] = 1;
        }
      }
      
      const uniqueWords = Object.keys(wordCounts);
      const wordFrequency = Object.values(wordCounts);
      const responseData = { 'words': uniqueWords, 'frequency': wordFrequency };
      res.json(responseData);
    } else {
      res.status(400).json({ 'error': 'Invalid URL' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
