import React, { useEffect, useState } from 'react';
import { Spin, Alert, Row, Col } from 'antd';
import fetchAnsweredFortunes from '../fortuneAnsweredService'; // Yeni servis dosyasını dahil et
import FortuneAnsweredCard from '../components/FortuneAnsweredCard';

const AnsweredFortunesPage = () => {
  const [fortunes, setFortunes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFortunes = async () => {
      try {
        const data = await fetchAnsweredFortunes();
        setFortunes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFortunes();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  }

  if (error) {
    return <Alert message="Hata" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ padding: '16px' }}>
      {fortunes.length > 0 ? (
        <Row gutter={[8, 8]}>
          {fortunes.map((fortune) => (
            <Col xs={24} sm={12} lg={12} key={fortune.id}>
              <FortuneAnsweredCard fortune={fortune} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>Henüz cevaplanan bir fal bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default AnsweredFortunesPage;
