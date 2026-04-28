const fetchMeme = async () => {
  try {
    const response = await fetch('https://reddit-meme.p.rapidapi.com/memes/trending', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'cab94ed6d9msha1f1a28215510f1p14e0b0jsn448761761aca',
        'x-rapidapi-host': 'reddit-meme.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response:", text.substring(0, 500));
  } catch (err) {
    console.error(err);
  }
}
fetchMeme();
