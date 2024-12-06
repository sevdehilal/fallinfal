import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../ApiService';
import './FortuneTellingPage.css';

const FortuneTellingPage = () => {
    const { state } = useLocation();
    const { fortuneTeller, selectedFiles } = state || {};
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [clientId, setClientId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await ApiService.fetchFortuneCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Kategoriler yüklenirken hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        };

        const getClientId = () => {
            const savedClientId = localStorage.getItem('userId');
            if (savedClientId) setClientId(parseInt(savedClientId));
        };

        fetchCategories();
        getClientId();
    }, []);

    const handleSubmit = async () => {
        if (!clientId || !fortuneTeller) {
            alert('Eksik kullanıcı veya falcı bilgisi!');
            return;
        }

        if (selectedFiles.length < 3) {
            alert('En az 3 fotoğraf yüklemeniz gerekiyor!');
            return;
        }

        if (selectedCategories.length === 0) {
            alert('En az bir kategori seçmelisiniz!');
            return;
        }

        const categoryIds = selectedCategories.map(cat => cat.id);
        const photos = selectedFiles.slice(0, 3);

        const success = await ApiService.saveFortune({
            clientId,
            fortunetellerId: fortuneTeller.id,
            categoryIds,
            photos,
        });

        if (success) {
            alert('Fal başarıyla gönderildi!');
        } else {
            alert('Fal başarıyla gönderildi!');
        }
    };

    if (loading) {
        return <p>Kategoriler yükleniyor...</p>;
    }

    return (
        <div className="container">
            <div className="card">
                <h2>Falcı: {fortuneTeller.firstName} {fortuneTeller.lastName}</h2>
            </div>
            <div className="card">
                <h3>Merak Ettiğiniz Konular:</h3>
                {categories.length === 0 && <p>Henüz kategori yok.</p>}
                <div className="category-card">
                    {categories.map((category, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedCategories([...selectedCategories, category]);
                                    } else {
                                        setSelectedCategories(selectedCategories.filter(cat => cat !== category));
                                    }
                                }}
                            />
                            {category.categoryName}
                        </label>
                    ))}
                </div>
            </div>
            <div className="card">
                <h3>Fotoğraflar:</h3>
                <div className="photos-container">
                    {selectedFiles.length > 0 ? (
                        selectedFiles.map((file, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`Selected ${index + 1}`}
                            />
                        ))
                    ) : (
                        <p>Henüz fotoğraf yüklenmedi.</p>
                    )}
                </div>
            </div>
            <button onClick={handleSubmit}>Gönder</button>
        </div>
    );
};

export default FortuneTellingPage;
