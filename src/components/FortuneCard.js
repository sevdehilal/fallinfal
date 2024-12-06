import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FortuneCard.css';

const FortuneCard = ({ fortune }) => {
  const navigate = useNavigate();
  const { id, firstName, lastName, categories, createDate, imageData1, imageData2, imageData3 } = fortune;

  const photos = [imageData1, imageData2, imageData3].filter(Boolean); // Sadece dolu görselleri alın

  const handleCardClick = () => {
    // Kullanıcı bilgilerini state ile ilet
    navigate(`/user-details/${id}`, { state: { fortune } });
  };

  return (
    <div className="fortune-card-fortune" onClick={handleCardClick}>
      <div className="fortune-header">
        <h3>{firstName} {lastName}</h3>
        <p>{new Date(createDate).toLocaleDateString()}</p>
      </div>

      {photos.length > 0 && (
        <div className="fortune-photos">
          {photos.map((photo, index) => (
            <img key={index} src={`data:image/jpeg;base64,${photo}`} alt={`Fortune Photo ${index + 1}`} className="fortune-photo" />
          ))}
        </div>
      )}

      <div className="fortune-details">
        <p><strong>Kategori:</strong> {categories.join(', ')}</p>
      </div>
    </div>
  );
};

export default FortuneCard;
