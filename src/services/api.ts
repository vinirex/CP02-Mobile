export interface MemeResponse {
  url: string;
  title: string;
}

export const fetchDailyMeme = async (): Promise<MemeResponse | null> => {
  try {
    const response = await fetch('https://reddit-meme.p.rapidapi.com/memes/trending', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'cab94ed6d9msha1f1a28215510f1p14e0b0jsn448761761aca',
        'x-rapidapi-host': 'reddit-meme.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch meme');
    }

    const data = await response.json();
    // Assuming the API returns an object with a 'url' and 'title', 
    // or an array. Let's handle a common scenario for this API.
    // Sometimes it returns { "url": "...", "title": "..." } or an array of objects.
    // If it's an array, get the first one.
    if (Array.isArray(data) && data.length > 0) {
      // Filtra para garantir que pegamos um que seja gif, jpg ou png
      const validMemes = data.filter(item => 
        item.url && (item.url.includes('.gif') || item.url.includes('.jpg') || item.url.includes('.png'))
      );
      
      // Se tivermos memes válidos, sorteamos um deles. Se não, pegamos o primeiro por garantia.
      const listToUse = validMemes.length > 0 ? validMemes : data;
      const randomMeme = listToUse[Math.floor(Math.random() * listToUse.length)];

      return {
        url: randomMeme.url,
        title: randomMeme.title || 'Memes'
      };
    } else if (data.url) {
      return {
        url: data.url,
        title: data.title || 'Memes'
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching meme:', error);
    return null;
  }
};
