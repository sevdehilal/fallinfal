import React, { useState, useEffect } from 'react';
import './ClientProfilePage.css';  // CSS dosyasını import ediyoruz
import { message } from 'antd';

function ClientProfilePage() {
  const [userData, setUserData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    dateofBirth: '',
    occupation: '',
    maritalStatus: '',
    gender: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clientId = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!clientId) {
      setError("No client found!");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(`https://fallinfal.com/api/Auth/GetClientById?clientId=${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
    
        if (result.success && result.data) {
          const data = result.data;
          setUserData(data);
          setUpdatedData({
            userName: data.userName,
            firstName: data.firstName,
            lastName: data.lastName,
            dateofBirth: new Date(data.dateofBirth).toISOString().split('T')[0], // Tarihi formatlıyoruz
            occupation: data.occupation,
            maritalStatus: data.maritalStatus,
            gender: data.gender || '', // Boş olma durumunda boş string döndürüyoruz
            email: data.email,
          });
        } else {
          setError(result.message || "Failed to fetch client data");
        }
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    }
    
    fetchData();
  }, [clientId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("No token found! Please log in.");
      return;
    }

    try {
      const response = await fetch('https://fallinfal.com/api/Auth/UpdateClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        message.success("Bilgiler güncellendi");
      }

      if (!response.ok) {
        throw new Error('Failed to update client data');
      }

      const data = await response.json();
      console.log('Data updated successfully:', data);
    } catch (error) {
      console.error('Error updating client data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="client-profile-page">
      <div className="client-profile-form-card">
        <h1>Profil</h1>
        <form className="client-profile-form" onSubmit={handleSubmit}>
          <div className="input-pair">
            <div className="input-field">
              <label>Kullanıcı Adı:</label>
              <i className="input-icon fa fa-user"></i> {/* İkon */}
              <input
                type="text"
                name="userName"
                value={updatedData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label>Ad:</label>
              <i className="input-icon fa fa-id-card"></i> {/* İkon */}
              <input
                type="text"
                name="firstName"
                value={updatedData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-pair">
            <div className="input-field">
              <label>Soyad:</label>
              <i className="input-icon fa fa-user-tag"></i> {/* İkon */}
              <input
                type="text"
                name="lastName"
                value={updatedData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label>Doğum Tarihi:</label>
              <i className="input-icon fa fa-calendar-alt"></i> {/* İkon */}
              <input
                type="date"
                name="dateofBirth"
                value={updatedData.dateofBirth}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-pair">
            <div className="input-field">
              <label>Meslek:</label>
              <i className="input-icon fa fa-briefcase"></i> {/* İkon */}
              <input
                type="text"
                name="occupation"
                value={updatedData.occupation}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label>Medeni Durum:</label>
              <i className="input-icon fa fa-heart"></i> {/* İkon */}
              <input
                type="text"
                name="maritalStatus"
                value={updatedData.maritalStatus}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-pair">
            <div className="input-field">
              <label>Cinsiyet:</label>
              <i className="input-icon fa fa-venus-mars"></i> {/* İkon */}
              <select
                name="gender"
                value={updatedData.gender}
                onChange={handleChange}
              >
                <option value="">Seçiniz</option>
                <option value="Kadın">Kadın</option>
                <option value="Erkek">Erkek</option>
                <option value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</option>
              </select>
            </div>
            <div className="input-field">
              <label>E-posta:</label>
              <i className="input-icon fa fa-envelope"></i> {/* İkon */}
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">Güncelle</button>
        </form>
      </div>
    </div>
  );
}

export default ClientProfilePage;
