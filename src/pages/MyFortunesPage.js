import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Tabs, Spin, Alert } from 'antd';
import { fetchPendingFortunes } from '../FortuneService';
import fetchAnsweredFortunes from '../fortuneAnsweredService';
import FortuneCardForClient from '../components/FortuneCardForClient';
import FortuneAnsweredCard from '../components/FortuneAnsweredCard';
import './MyFortunesPage.css';


const { Text } = Typography;

const MyFortunesPage = () => {
  const [pendingFortunes, setPendingFortunes] = useState([]);
  const [answeredFortunes, setAnsweredFortunes] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingAnswered, setLoadingAnswered] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFortunes = async () => {
      try {
        const pendingData = await fetchPendingFortunes();
        setPendingFortunes(pendingData);

        const answeredData = await fetchAnsweredFortunes();
        setAnsweredFortunes(answeredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPending(false);
        setLoadingAnswered(false);
      }
    };

    loadFortunes();
  }, []);

  const tabItems = [
    {
      key: '1',
      label: 'Cevap Bekleyen Fallar',
      children: (
        <div>
          {loadingPending ? (
            <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
          ) : error ? (
            <Alert message="Hata" description={error} type="error" showIcon />
          ) : pendingFortunes.length > 0 ? (
            <Row gutter={[16, 16]} justify="center" style={{ padding: '20px' }}>
              {pendingFortunes.map((fortune) => (
                <Col key={fortune.id} xs={24} sm={12} md={12} lg={12}>
                  <FortuneCardForClient fortune={fortune} />
                </Col>
              ))}
            </Row>
          ) : (
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Cevap bekleyen bir fal bulunmamaktadır.
            </Text>
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Cevaplanan Fallar',
      children: (
        <div>
          {loadingAnswered ? (
            <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
          ) : error ? (
            <Alert message="Hata" description={error} type="error" showIcon />
          ) : answeredFortunes.length > 0 ? (
            <Row gutter={[16, 16]} justify="center" style={{ padding: '20px' }}>
              {answeredFortunes.map((fortune) => (
                <Col key={fortune.id} xs={24} sm={12} md={12} lg={12}>
                  <FortuneAnsweredCard fortune={fortune} />
                </Col>
              ))}
            </Row>
          ) : (
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Cevaplanan bir fal bulunmamaktadır.
            </Text>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="my-fortunes-page">
      <Tabs defaultActiveKey="1" centered items={tabItems} />
    </div>
  );
};

export default MyFortunesPage;
