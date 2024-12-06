import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EarnCoinsPage.css'; // CSS için gerekli dosya
import img from '../img/tarot.png'; // Kart görseli

const EarnCoinsPage = () => {
  const [rewards, setRewards] = useState([5, 10, 15, 20, 25, 30, 35, 0]); // Ödül değerleri
  const [selectedReward, setSelectedReward] = useState(null); // Seçilen ödül
  const [isRevealed, setIsRevealed] = useState(false); // Kartların açılma durumu
  const [isLoading, setIsLoading] = useState(false); // Yüklenme durumu
  const navigate = useNavigate(); // Yönlendirme için kullanılır

  // Ödül listesini karıştır
  const shuffleRewards = () => {
    setRewards((prevRewards) => [...prevRewards.sort(() => Math.random() - 0.5)]);
  };

  // Kart seçme işlemi
  const handleSelectReward = (index) => {
    if (!isRevealed) {
      shuffleRewards();
      setSelectedReward(rewards[index]);
      setIsRevealed(true);
    }
  };

  // Ödülü API'ye gönderme işlemi
  const handleConfirmReward = async () => {
    const clientId = localStorage.getItem('userId'); // Kullanıcı ID'si
    const authToken = localStorage.getItem('authToken'); // Auth token
    console.log(authToken);

    if (!clientId) {
      alert('Kullanıcı ID bulunamadı!');
      return;
    }

    if (!authToken) {
      alert('Kimlik doğrulama token bulunamadı!');
      return;
    }

    try {
      setIsLoading(true); // Yüklenme durumunu aç
      const response = await fetch(
        `https://fallinfal.com/api/Client/EarnCredit?credit=${selectedReward}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ clientId, credit: selectedReward }),
        }
      );

      if (response.ok) {
        const result = await response.json(); // Yanıtı JSON olarak al
        alert(`Ödül başarıyla alındı: ${result.credit || selectedReward} Coin!`);
        navigate('/', { state: { reward: selectedReward } }); // Ana sayfaya yönlendir
      } else {
        const error = await response.json();
        alert(`Bir hata oluştu: ${error.message || 'Bilinmeyen bir hata.'}`);
      }
    } catch (error) {
      alert(`Bir hata oluştu: ${error.message}`);
    } finally {
      setIsLoading(false); // Yüklenme durumunu kapat
    }
  };

  return (
    <div className="earn-coins-container">
      <h2>Bir Kart Seç ve Coin Kazan!</h2>
      <div className="reward-card-container">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className="reward-card"
            onClick={() => handleSelectReward(index)}
          >
            {isRevealed ? (
              <span>{reward} Coin</span>
            ) : (
              <img src={img} alt="Tarot Card" />
            )}
          </div>
        ))}
      </div>
      {isRevealed && (
        <div>
          <p>{selectedReward} Coin kazandınız! Ödülü almak için onaylayın.</p>
          <button
            onClick={handleConfirmReward}
            className="confirm-button"
            disabled={isLoading}
          >
            {isLoading ? 'Gönderiliyor...' : 'Ödülü Al'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EarnCoinsPage;
