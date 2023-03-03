// Listen for song data message from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'songData') {
      // Send song data to DALL-E API
      fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          prompt: `A picture of ${message.title} by ${message.artist}`,
          model: 'image-alpha-001',
          num_images: 1,
          size: '512x512',
          response_format: 'url'
        })
      })
        .then(response => response.json())
        .then(data => {
          const imageUrl = data.data[0].url;
          // Send image URL to content script
          chrome.tabs.sendMessage(sender.tab.id, { type: 'imageURL', url: imageUrl });
        });
    }
  });
  