const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DALLE_API_KEY = 'YOUR_API_KEY';

async function extractSongData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://open.spotify.com');

  // Wait for the user to log in
  await page.waitForSelector('.RootlistItem__link');

  // Click the "Play" button to start playing a song
  await page.click('.RootlistItem__link');

  // Wait for the song to start playing
  await page.waitForSelector('.now-playing-bar__song-name');

  // Extract the song title and artist name
  const songTitle = await page.evaluate(() => {
    return document.querySelector('.now-playing-bar__song-name').textContent;
  });
  const artistName = await page.evaluate(() => {
    return document.querySelector('.now-playing-bar__artist-name').textContent;
  });

  await browser.close();

  return { songTitle, artistName };
}

app.post('/generate-image', async (req, res) => {
  const { songTitle, artistName } = await extractSongData();

  // Send song data to DALL-E API
  const response = await axios.post('https://api.openai.com/v1/images/generations', {
    prompt: `A picture of ${songTitle} by ${artistName}`,
    model: 'image-alpha-001',
    num_images: 1,
    size: '512x512',
    response_format: 'url'
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DALLE_API_KEY}`
    }
  });

  const imageUrl = response.data.data[0].url;
  res.json({ imageUrl });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
