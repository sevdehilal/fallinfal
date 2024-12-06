import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import background from '../img/background.png'; 

const PhotoSelectionPage = () => {
  const { state } = useLocation(); // State üzerinden gelen fortuneTeller bilgisi
  const { fortuneTeller } = state || {};
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length) {
      
      const updatedFiles = [...selectedFiles, ...files].slice(0, 3);
      setSelectedFiles(updatedFiles);
    }
  };

  const handleGoToNextPage = () => {
    if (selectedFiles.length !== 3) {
      alert('En az 3 fotoğraf seçmelisiniz.');
      return;
    }
    // Fotoğraflar ve falcı bilgisi ile geçiş
    navigate('/fortune-telling', {
      state: { 
        fortuneTeller: fortuneTeller,
        selectedFiles: selectedFiles
      }
    });
  };

  return (
    <div 
      style={{
        backgroundImage: `url(${background})`,  
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        
        color: 'white',  // Yazı rengi
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <div 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Şeffaf beyaz arka plan
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginTop: '20px', color: 'black' }}>
          Göndermek İstediğin Fal Fotoğraflarını Yükle
        </h1>
        
        {/* Dosya seçme butonu burada */}
        <div style={{ marginTop: '20px' }}>
          <label 
            htmlFor="file-input"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#9b4dca', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Dosyaları Seç
          </label>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileSelect} 
            id="file-input"
            style={{ display: 'none' }} // Dosya inputu gizlenir
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: 'black' }}>Seçilen Fotoğraflar ({selectedFiles.length}/3):</h3>
          {selectedFiles.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {Array.from(selectedFiles).map((file, index) => (
                <div key={index} style={{ margin: '10px' }}>
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={`selected-img-${index}`} 
                    style={{ 
                      width: '175px', 
                      height: '175px', 
                      objectFit: 'cover', 
                      borderRadius: '8px'
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No photos selected</p>
          )}
        </div>
        <div>
          <button 
            onClick={handleGoToNextPage} 
            disabled={selectedFiles.length !== 3} 
            style={{
              padding: '10px 20px', 
              backgroundColor: selectedFiles.length === 3 ? '#9b4dca' : '#ccc', // Mor renk
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: selectedFiles.length === 3 ? 'pointer' : 'not-allowed',
              marginTop: '20px'
            }}
          >
            İleri
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoSelectionPage;
