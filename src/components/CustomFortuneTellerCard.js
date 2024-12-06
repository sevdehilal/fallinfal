import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoldOutlined, StarOutlined } from '@ant-design/icons';

const CustomFortuneTellerCard = ({ fortuneTeller, clientCredit }) => {
  const navigate = useNavigate();

  const handleEarnCoins = () => {
    navigate('/earn-coins'); // Coin kazanma sayfasına yönlendirme
  };

  const handlePhotoSelection = () => {
    navigate('/photo-selection', { state: { fortuneTeller } });
  };

  return (
    <div
      className="card"
      style={{
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        color: 'black',
        width: '50%',
        margin: '10px auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3>
        {fortuneTeller.firstName} {fortuneTeller.lastName}
      </h3>

      {/* Puan */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <StarOutlined style={{ color: 'gold', marginRight: '5px' }} />
        <span>{fortuneTeller.rating} Puan</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ marginRight: '5px' }}>👀</span>
        <span>{fortuneTeller.totalVoted} Kişi Puan Verdi</span>
      </div>

      {/* Gerekli Altın */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <GoldOutlined style={{ color: 'gold', marginRight: '5px' }} />
        <span>{fortuneTeller.requirementCredit} Altın</span>
      </div>

      {/* İşlem Butonları */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // Butonları sağa hizalayacak
          marginTop: '10px',
        }}
      >
        {clientCredit < fortuneTeller.requirementCredit ? (
          <button
            onClick={handleEarnCoins}
            style={{
              padding: '10px 20px',
              backgroundColor: 'red',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px', // Butonlar arasına boşluk ekle
            }}
          >
            Coin Kazan
          </button>
        ) : (
          <button
            onClick={handlePhotoSelection}
            style={{
              padding: '10px 20px',
              backgroundColor: 'purple',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px', // Butonlar arasına boşluk ekle
            }}
          >
            Fal Baktır
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomFortuneTellerCard;
