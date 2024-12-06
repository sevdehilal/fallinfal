import React, { useState, useEffect } from 'react';
import { fetchPendingFortunesByFortuneTellerId, fetchAnsweredFortunesByFortuneTellerId } from '../FortuneService';
import FortuneCard from '../components/FortuneCard';
import DashboardAppBar from '../components/DashboardAppBar';

const FortuneTellerDashboard = () => {
  const [pendingFortunes, setPendingFortunes] = useState([]);
  const [answeredFortunes, setAnsweredFortunes] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const fortuneTellerId = parseInt(localStorage.getItem('fortuneTellerId'));

    if (!fortuneTellerId) {
      console.error('No fortune teller ID found in localStorage');
      return;
    }

    const fetchPendingFortunes = async () => {
      try {
        const fortunes = await fetchPendingFortunesByFortuneTellerId(fortuneTellerId);
        setPendingFortunes(fortunes);
      } catch (error) {
        console.error('Error fetching pending fortunes:', error);
      }
    };

    fetchPendingFortunes();
  }, []);

  const fetchAnsweredFortunes = async () => {
    const fortuneTellerId = parseInt(localStorage.getItem('fortuneTellerId'));

    if (!fortuneTellerId) {
      console.error('No fortune teller ID found in localStorage');
      return;
    }

    try {
      const fortunes = await fetchAnsweredFortunesByFortuneTellerId(fortuneTellerId);
      setAnsweredFortunes(fortunes);
    } catch (error) {
      console.error('Error fetching answered fortunes:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'viewed') {
      fetchAnsweredFortunes();
    }
  }, [activeTab]);

  return (
    <div className="fortune-teller-dashboard">
      <DashboardAppBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="fortune-list">
        {activeTab === 'pending' && (
          pendingFortunes.length > 0 ? (
            pendingFortunes.map((fortune) => (
              <FortuneCard key={fortune.id} fortune={fortune} />
            ))
          ) : (
            <p>Bekleyen fal bulunmamaktadır.</p>
          )
        )}

        {activeTab === 'viewed' && (
          answeredFortunes.length > 0 ? (
            answeredFortunes.map((fortune) => (
              <FortuneCard key={fortune.id} fortune={fortune} />
            ))
          ) : (
            <p>Baktığınız fal bulunmamaktadır.</p>
          )
        )}
      </div>
    </div>
  );
};

export default FortuneTellerDashboard;
