// Extract song data from the page
const songTitle = document.querySelector('.song-title').innerText;
const artistName = document.querySelector('.artist-name').innerText;

// Send song data to background script
chrome.runtime.sendMessage({ type: 'songData', title: songTitle, artist: artistName });

// Listen for image URL message from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'imageURL') {
      // Display prompt with image URL
      const imageUrl = message.url;
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = 'image.png'; // change the format and file name as needed
      document.body.appendChild(downloadLink);
      downloadLink.click
    }
});