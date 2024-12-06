import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmailService from '../EmailService'; // Güncellenmiş isim

const EmailVerificationPage = () => {
  const { id } = useParams(); // URL'deki id parametresini alır
  const navigate = useNavigate(); // Yönlendirme için kullanılır
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleVerifyId = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // ID doğrulaması için API çağrısı
      await EmailService.verifyId(id);

      setMessage('ID başarıyla doğrulandı!');
      setTimeout(() => {
        navigate('/'); // Doğrulama sonrası giriş sayfasına yönlendirme
      }, 2000);
    } catch (error) {
      console.error('Verification Error:', error);
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>E-posta Doğrulama</h1>
      <p>ID: {id}</p>
      <p>Doğrulama işlemini başlatmak için aşağıdaki butona tıklayın.</p>
      <button
        onClick={handleVerifyId}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? 'Doğrulama Yapılıyor...' : 'Doğrulamayı Başlat'}
      </button>
      {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
    </div>
  );
};

export default EmailVerificationPage;
