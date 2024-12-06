import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './UserDetailsPage.css';

const UserDetailsPage = () => {
  const location = useLocation();
  const { fortune } = location.state;

  const [answer, setAnswer] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [modalImage, setModalImage] = useState(null); // Modalda gösterilecek resim

  if (!fortune) {
    return <p>Bilgi bulunamadı.</p>;
  }

  const {
    firstName,
    lastName,
    gender,
    occupation,
    maritalStatus,
    dateOfBirth,
    categories,
    createDate,
    imageData1,
    imageData2,
    imageData3,
  } = fortune;

  const photos = [imageData1, imageData2, imageData3].filter(Boolean);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const sendAnswer = async () => {
    if (!answer.trim()) {
      alert('Cevap alanı boş bırakılamaz!');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(
        `http://fallinfal.com/api/Application/AnswerApplication?id=${fortune.id}&answer=${encodeURIComponent(answer)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Answers: answer,
            ApplicationsId: fortune.id,
          }),
        }
      );

      if (response.ok) {
        alert('Cevap başarıyla gönderildi!');
        setAnswer('');
      } else {
        alert(`Gönderim başarısız oldu. Hata kodu: ${response.status}`);
      }
    } catch (error) {
      alert(`Bir hata oluştu: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="user-details">
      <div className="card">
        <h2>
          {firstName} {lastName}
        </h2>
        <p>
          <strong>Cinsiyet:</strong> {gender}
        </p>
        <p>
          <strong>Meslek:</strong> {occupation}
        </p>
        <p>
          <strong>Medeni Durum:</strong> {maritalStatus}
        </p>
        <p>
          <strong>Doğum Tarihi:</strong>{' '}
          {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : 'Belirtilmemiş'}
        </p>
        <p>
          <strong>Kategori:</strong> {categories.join(', ')}
        </p>
        <p>
          <strong>Oluşturma Tarihi:</strong> {new Date(createDate).toLocaleDateString()}
        </p>

        {photos.length > 0 && (
          <div className="user-photos">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${photo}`}
                alt={`Photo ${index + 1}`}
                className="user-photo"
                onClick={() => openModal(`data:image/jpeg;base64,${photo}`)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="answer-section">
        <textarea
          placeholder="Fal cevabını yazın..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows="10"
        />
        <button onClick={sendAnswer} disabled={isSending}>
          {isSending ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </div>

      {modalImage && (
        <div className="modal active" onClick={closeModal}>
          <img src={modalImage} alt="Modal Görüntü" />
          <span className="modal-close" onClick={closeModal}>
            &times;
          </span>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
