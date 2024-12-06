import axios from 'axios';
import FortuneForFortuneTeller from './models/FortuneForFortuneTeller';
import FortuneList from './models/FortuneList';

const apiUrl = "http://fallinfal.com/api/Application";

export const fetchPendingFortunesByFortuneTellerId = async () => {
  const fortuneTellerId = parseInt(localStorage.getItem('fortuneTellerId')); // localStorage'den fortuneTellerId al

  if (!fortuneTellerId) {
    throw new Error('No fortune teller ID found in localStorage');
  }

  try {
    const response = await axios.get(
      `${apiUrl}/GetApplicationByFortuneTeller?id=${fortuneTellerId}`
    );
    
    console.log('API Response:', response.data);  // API yanıtını konsola yazdırıyoruz
    
    // Eğer data dizisi boşsa, boş bir dizi döndür
    if (Array.isArray(response.data.data) && response.data.data.length === 0) {
      return [];
    }

    // Gelen veriyi FortuneForFortuneTeller modeline dönüştür
    return response.data.data.map(fortune => FortuneForFortuneTeller.fromJson(fortune));
  } catch (error) {
    console.error('Failed to load fortunes', error);
    throw new Error('Failed to load fortunes');
  }
};

export const fetchAnsweredFortunesByFortuneTellerId = async (fortuneTellerId) => {
  try {
    const response = await axios.get(
      `http://fallinfal.com/api/Application/GetApplicationByFortuneTellerIsAnsweredTrue?id=${fortuneTellerId}`
    );

    // Yanıtın başarılı olup olmadığını kontrol et
    if (response.status === 200) {
      // response.data'nın yapısını kontrol et
      if (response.data && Array.isArray(response.data.data)) {
        // Eğer data bir dizi ise, map fonksiyonu ile dönüştür
        return response.data.data.map((json) => FortuneForFortuneTeller.fromJson(json));
      } else {
        // Eğer data bir dizi değilse, hata fırlat
        console.error('Unexpected response format:', response.data);
        throw new Error('Unexpected response format');
      }
    } else {
      throw new Error('Failed to fetch answered fortunes');
    }
  } catch (error) {
    console.error('Error fetching answered fortunes:', error);
    throw error;
  }
};

  


export const fetchPendingFortunes = async () => {
  // localStorage'dan clientId'yi al ve sayıya dönüştür
  const clientId = parseInt(localStorage.getItem('userId'), 10);

  // Eğer clientId yoksa hata fırlat
  if (!clientId) {
    throw new Error('No client ID found in localStorage');
  }

  try {
    // API çağrısı yap
    const response = await axios.get(
      `${apiUrl}/GetApplicationByClientIdIsAnsweredFalse?id=${clientId}`
    );

    console.log('API Response:', response.data); // Gelen yanıtı kontrol etmek için log

    // Gelen yanıtın formatını doğrula
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      // Gelen veriyi modelle eşleştir
      return response.data.data.map(fortune => FortuneList.fromJson(fortune));
    } else {
      // Yanıt beklenilen formatta değilse hata fırlat
      console.error('Unexpected response format:', response.data);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    // Hata durumunu logla
    console.error('Failed to load fortunes:', error.message || error);
    throw new Error('Failed to load fortunes');
  }
};
