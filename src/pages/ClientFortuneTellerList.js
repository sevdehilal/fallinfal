import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd';
import ApiService from '../ApiService';
import CustomFortuneTellerCard from '../components/CustomFortuneTellerCard';
import '../style.css';

const { Title } = Typography;

const ClientFortuneTellerList = () => {
  const [fortuneTellers, setFortuneTellers] = useState([]);
  const [clientCredit, setClientCredit] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClientCredit = async () => {
    try {
      const clientId = localStorage.getItem('userId'); // Kullanıcı ID'sini localStorage'dan alıyoruz
      if (!clientId) {
        throw new Error('Kullanıcı ID bulunamadı.');
      }

      const response = await fetch(
        `http://fallinfal.com/api/Client/GetCredit?clientId=${clientId}`,
      );

      if (response.ok) {
        const data = await response.json(); // Yanıtı JSON formatında alıyoruz
        // Eğer 'success' field'ı true ise, credit değerini state'e set ediyoruz
        if (data.success) {
          setClientCredit(data.data); // data.data içindeki credit değerini alıyoruz
        } else {
          throw new Error(`Hata: ${data.message}`);
        }
      } else {
        throw new Error(`Kullanıcı altını alınamadı: ${response.status}`);
      }
    } catch (error) {
      console.error('Kullanıcı altını alınamadı:', error.message);
    }
  };

  useEffect(() => {
    const fetchFortuneTellers = async () => {
      const fetchedFortuneTellers = await ApiService.fetchFortuneTellers();
      setFortuneTellers(fetchedFortuneTellers);
      setLoading(false);
    };

    fetchFortuneTellers();
    fetchClientCredit();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background">
      <Row
        justify="space-between"
        align="middle"
        style={{
          padding: '16px 20px',
          color: 'white',
          borderBottom: '2px solid white',
        }}
      >
        <Col>
          <Title level={3} style={{ color: 'white', margin: 0, fontStyle: 'italic' }}>
            Fall in Fal
          </Title>
        </Col>
        <Col>
          <span style={{ fontSize: '18px', marginRight: '10px' }}>💰</span>
          <span style={{ fontSize: '18px' }}>
            {clientCredit !== null ? `${clientCredit} Altın` : 'Yükleniyor...'}
          </span>
        </Col>
      </Row>

      <h1 className="fortune-list" style={{ color: 'white', textAlign: 'center' }}>
        Falcı Listesi
      </h1>
      {fortuneTellers.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center' }}>Hiç falcı bulunamadı.</p>
      ) : (
        <div>
          {fortuneTellers.map((fortuneTeller) => (
            <CustomFortuneTellerCard
              key={fortuneTeller.id}
              fortuneTeller={fortuneTeller}
              clientCredit={clientCredit} // clientCredit burada prop olarak ekleniyor
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientFortuneTellerList;
