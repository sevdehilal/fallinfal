import FortuneList from './models/FortuneList';

const fetchAnsweredFortunes = async () => {
  try {
    // localStorage'den clientId al
    const clientId = localStorage.getItem('userId');

    if (!clientId) {
      throw new Error('No fortune teller ID found in localStorage');
    }

    // API'ye istek at
    const response = await fetch(
      `http://fallinfal.com/api/Application/GetApplicationByClientIdIsAnsweredTrue?id=${clientId}`
    );

    if (response.ok) {
      const jsonList = await response.json();

      // Eğer data dizisi boşsa, boş bir dizi döndür
      if (Array.isArray(jsonList.data) && jsonList.data.length === 0) {
        return [];
      }

      // JSON verilerini FortuneList nesnelerine dönüştür
      return jsonList.data.map((json) => FortuneList.fromJson(json));
    } else {
      throw new Error('Failed to load fortunes');
    }
  } catch (error) {
    console.error('Error fetching answered fortunes:', error);
    throw error;
  }
};

export default fetchAnsweredFortunes;
