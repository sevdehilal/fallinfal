import React, { useState } from 'react';
import { Typography, Row, Col, Divider, Modal, Rate, Button, message } from 'antd';
import coffeeCupImage from '../img/fortunecardimage.png';
import './FortuneCardForClient.css';

const { Text } = Typography;

const FortuneAnsweredCard = ({ fortune }) => {
  const { fortunetellerFirstName, fortunetellerLastName, createDate, answer, score } = fortune;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(score || 0); // Başlangıç olarak mevcut puan
  const [currentRating, setCurrentRating] = useState(score); // Kullanıcının daha önceki puanı
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  // Puan gönderme işlevi
  const handleRatingSubmit = async () => {
    if (rating === 0) {
      message.warning('Lütfen bir puan seçin!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://fallinfal.com/api/Client/ScoreFortune?ApplicationId=${fortune.id}&score=${rating}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating }),
        }
      );

      if (response.ok) {
        message.success('Puanınız başarıyla gönderildi!');
        setCurrentRating(rating); // Gönderilen puanı mevcut puan olarak ata
        setIsModalOpen(false);
      } else {
        throw new Error('Puan gönderiminde hata oluştu.');
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fortune-card-fortune" onClick={showModal}>
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
                Falcı: {fortunetellerFirstName} {fortunetellerLastName}
              </Text>
              <div>
                <Text className="fortune-card-date">
                  Tarih: {new Date(createDate).toLocaleString('tr-TR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                <Divider className="fortune-card-divider" />
                <Text className={`fortune-card-status ${answer ? 'answered' : 'pending'}`}>
                  {answer ? 'Cevaplandı' : 'Cevap Bulunamadı'}
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal */}
      <Modal
        title="Falın Cevabı"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{answer || 'Falın cevabı bulunamadı.'}</p>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            {currentRating ? 'Daha önce verdiğiniz puan:' : 'Puan Ver:'}
          </Text>
          <Rate
            allowHalf
            disabled={!!currentRating} // Eğer puan verilmişse yıldızlar pasif olur
            value={currentRating || rating} // Mevcut puan veya yeni seçilen puanı göster
            onChange={(value) => setRating(value)}
            style={{ fontSize: 24 }}
          />
        </div>
        <Divider />
        {!currentRating && (
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              İptal
            </Button>
            <Button
              type="primary"
              loading={isSubmitting}
              onClick={handleRatingSubmit}
            >
              Gönder
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default FortuneAnsweredCard;
