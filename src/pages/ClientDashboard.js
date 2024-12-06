import React from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, ReadOutlined, LogoutOutlined } from '@ant-design/icons';
import kahveFali from '../img/kahvefali.png';
import tarotFali from '../img/tarot.png';
import elFali from '../img/hand.png';
import dogumHaritasi from '../img/dharita.png';
import '../style.css';
import './MyFortunesPage';

const { Title, Text } = Typography;

const ClientDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/fortune-teller-list');
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('fortuneTellerId');
    localStorage.removeItem('loggedInAs');

    // Redirect to login page
    navigate('/');
  };

  const cardData = [
    { 
      id: 1, 
      image: kahveFali, 
      title: 'Kahve Falı', 
      description: 'Kahve fincanınızın gizemini keşfedin.' 
    },
    { 
      id: 2, 
      image: tarotFali, 
      title: 'Tarot Falı', 
      description: 'Tarot kartlarınızın anlamlarını öğrenin.' 
    },
    { 
      id: 3, 
      image: elFali, 
      title: 'El Falı', 
      description: 'El çizgilerinizin sırlarını açığa çıkarın.' 
    },
    { 
      id: 4, 
      image: dogumHaritasi, 
      title: 'Doğum Haritası', 
      description: 'Doğum haritanızın rehberliğine ulaşın.' 
    },
  ];

  return (
    <div className="client-dashboard">
      <Row justify="space-between" align="middle" style={{ padding: '16px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderBottom: '2px solid #ffffff' }}>
        <Title level={3} style={{ color: 'white', margin: 0, fontStyle: 'italic' }}>
          Fall in Fal
        </Title>
        <div style={{ fontSize: '18px' }}>
          <Button 
            type="link" 
            icon={<UserOutlined />} 
            style={{ color: 'white', fontSize: '18px' }} 
            onClick={() => navigate('/profile')}
          >
            Profil
          </Button>
          <Button 
            type="link" 
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8h1c1.656 0 3-1.345 3-3 0-1.656-1.344-3-3-3h-1v6zm-1 6h-10c-3.314 0-6 2.686-6 6h22c0-3.314-2.686-6-6-6zm4.015 2c.243.618.423 1.277.551 1.968h-16.132c.128-.691.308-1.35.551-1.968h15.03zm-3.015-10v-6h-14v6c0 3.188 2.566 6 6 6h2c3.434 0 6-2.812 6-6z"/>
              </svg>
            } 
            style={{ color: 'white', fontSize: '18px' }} 
            onClick={() => navigate('/my-fortunes')}
          >
            Fallarım
          </Button>
          <Button 
            type="link" 
            icon={<LogoutOutlined />} 
            style={{ color: 'white', fontSize: '18px' }} 
            onClick={handleLogout}
          >
            Çıkış Yap
          </Button>
        </div>
      </Row>

      <div className="welcome-message">
        <Title level={4} style={{ color: 'white' }}>Fall in Fal'a hoş geldiniz!</Title>
        
        <Text style={{ display: 'block', marginTop: '20px', fontSize: '18px', fontStyle: 'italic', color: 'white' }}>
            "Hayatınızdaki sırları keşfetmeye ne dersiniz?"
        </Text>
        <Text style={{ display: 'block', fontSize: '18px', fontStyle: 'italic', color: 'white' }}>
            "Her fal, bir yolculuk... Geleceğinizi keşfedin!"
        </Text>
        <Text style={{ display: 'block', fontSize: '18px', fontStyle: 'italic', marginTop: '20px', color: 'white' }}>
            "Kahvenizin, kartlarınızın ve ellerinizin size neler fısıldayacağını merak etmiyor musunuz?"
        </Text>
      </div>

      <Row gutter={[16, 16]} justify="center" style={{ padding: '20px' }}>
        {cardData.map((card) => (
          <Col key={card.id} xs={24} sm={12} md={8} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              hoverable
              cover={
                <img 
                  alt={card.title} 
                  src={card.image} 
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                />
              }
              onClick={handleCardClick}
              style={{ width: '100%', maxWidth: '250px', height: '350px', backgroundColor: 'white', color: 'black' }} 
            >
              <Card.Meta 
                title={<span style={{ color: 'black' }}>{card.title}</span>} 
                description={<span style={{ color: 'black' }}>{card.description}</span>} 
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ClientDashboard;
