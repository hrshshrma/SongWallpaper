/*
document.addEventListener('DOMContentLoaded', async function() {
    const generateImageButton = document.getElementById('generate-image-button');
    const generatedImage = document.getElementById('generated-image');
  
    generateImageButton.addEventListener('click', async function() {
      const tab = await getCurrentTab();
      const response = await fetch('http://localhost:3000/generate-image', { method: 'POST' });
      const data = await response.json();
  
      generatedImage.src = data.imageUrl;
      generatedImage.addEventListener('load', function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = generatedImage.width;
        canvas.height = generatedImage.height;
        ctx.drawImage(generatedImage, 0, 0);
        const link = document.createElement('a');
        link.download = 'spotify-image.png';
        link
*/

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('http://localhost:3000/generate-image', {
      method: 'POST'
    });
    const data = await response.json();
    const imageUrl = data.imageUrl;
  
    const image = document.getElementById('image');
    const loading = document.querySelector('.loading');
  
    loading.style.display = 'none';
    image.style.display = 'block';
    image.src = imageUrl;
  });
  