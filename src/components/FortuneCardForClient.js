import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import coffeeCupImage from '../img/fortunecardimage.png'; // Kahve fincanı resminin yolu
import './FortuneCardForClient.css'; // Stil dosyasını dahil ediyoruz

const { Text } = Typography;

const FortuneCardForClient = ({ fortune }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/fortune-details/${fortune.id}`);
  };

  return (
    <div className="fortune-card-fortune" onClick={handleCardClick}>
      <Row gutter={16} align="middle">
        <Col span={6}>
          <img
            src={coffeeCupImage}
            alt="Kahve Fincanı"
            className="fortune-card-image"
          />
        </Col>
        <Col span={18}>
          <div className="fortune-card-meta">
            <Text strong className="fortune-card-title">
              Falcı: {fortune.fortunetellerFirstName} {fortune.fortunetellerLastName}
            </Text>
            <div>
              <Text className="fortune-card-date">
                Tarih: {new Date(fortune.createDate).toLocaleString('tr-TR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </Text>
              <Divider className="fortune-card-divider" />
              <Text className={`fortune-card-status ${fortune.answer ? 'answered' : 'pending'}`}>
                {fortune.answer ? 'Cevap Verildi' : 'Cevap Bekliyor'}
              </Text>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FortuneCardForClient;
