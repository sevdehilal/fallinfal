import React, { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined, CreditCardOutlined, StarOutlined, TrophyOutlined } from '@ant-design/icons';
import './FortuneTellerProfile.css';

function FortuneTellerProfilePage() {
  const [userData, setUserData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    dateofBirth: '',
    experience: '',
    requirementCredit: 0,
    gender: '',
    email: '',
    rating: 0,
    totalCredit: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fortuneTellerId = localStorage.getItem('fortuneTellerId');
  const token = localStorage.getItem('authToken');
  console.log(token);

  useEffect(() => {
    if (!fortuneTellerId) {
      setError("No fortune teller found!");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(`http://fallinfal.com/api/Auth/GetFortuneTellerById?fortuneTellerId=${fortuneTellerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
       
        const data = await response.json();
        console.log(data.response);
        if (response.ok) {
          // Error handling if dateofBirth is invalid
          const formattedDate = data.data.dateofBirth && data.data.dateofBirth !== "0001-01-01T00:00:00"
            ? new Date(data.data.dateofBirth).toISOString().split('T')[0]
            : ''; // Set empty if invalid date

          setUserData(data.data);
          setUpdatedData({
            userName: data.data.userName,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            dateofBirth: data.data.formattedDate,
            experience: data.data.experience,
            requirementCredit: data.data.requirementCredit,
            gender: data.data.gender,
            email: data.data.email,
            rating: data.data.rating,
            totalCredit: data.data.totalCredit,
          });
        } else {
          setError(data.message || "Failed to fetch data");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    }

    fetchData();
  }, [fortuneTellerId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!token) {
      setError("No token found! Please log in.");
      return;
    }

    try {
      const response = await fetch('https://fallinfal.com/api/Auth/UpdateFortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        message.success("Bilgiler güncellendi");
      } else {
        throw new Error('Failed to update fortune teller data');
      }
    } catch (error) {
      message.error('Error updating fortune teller data');
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
      <h1>Falcı Profil Bilgileri</h1>
      <Form
        className="client-profile-form"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <div className="input-pair">
          <div className="input-field">
            <label>Kullanıcı Adı:</label>
            <i className="input-icon fa fa-user"></i>
            <Input
              prefix={<UserOutlined />}
              name="userName"
              value={updatedData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Ad:</label>
            <i className="input-icon fa fa-id-card"></i>
            <Input
              prefix={<UserOutlined />}
              name="firstName"
              value={updatedData.firstName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-pair">
          <div className="input-field">
            <label>Soyad:</label>
            <i className="input-icon fa fa-user-tag"></i>
            <Input
              prefix={<UserOutlined />}
              name="lastName"
              value={updatedData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Doğum Tarihi:</label>
            <i className="input-icon fa fa-calendar-alt"></i>
            <Input
              prefix={<CalendarOutlined />}
              type="date"
              name="dateofBirth"
              value={updatedData.dateofBirth}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-pair">
          <div className="input-field">
            <label>Deneyim:</label>
            <i className="input-icon fa fa-trophy"></i>
            <Input
              prefix={<TrophyOutlined />}
              name="experience"
              value={updatedData.experience}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Gereken Kredi:</label>
            <i className="input-icon fa fa-credit-card"></i>
            <Input
              prefix={<CreditCardOutlined />}
              type="number"
              name="requirementCredit"
              value={updatedData.requirementCredit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-pair">
          <div className="input-field">
            <label>Cinsiyet:</label>
            <i className="input-icon fa fa-venus-mars"></i>
            <Input
              name="gender"
              value={updatedData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>E-posta:</label>
            <i className="input-icon fa fa-envelope"></i>
            <Input
              prefix={<MailOutlined />}
              name="email"
              value={updatedData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-pair">
          <div className="input-field">
            <label>Puan:</label>
            <i className="input-icon fa fa-star"></i>
            <Input
              prefix={<StarOutlined />}
              type="number"
              name="rating"
              value={updatedData.rating}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Toplam Kredi:</label>
            <i className="input-icon fa fa-credit-card"></i>
            <Input
              prefix={<CreditCardOutlined />}
              type="number"
              name="totalCredit"
              value={updatedData.totalCredit}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="primary" htmlType="submit" block>
          Güncelle
        </Button>
      </Form>
    </div>
  </div>
);
}

export default FortuneTellerProfilePage;
