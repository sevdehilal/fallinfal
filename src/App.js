import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientDashboard from './pages/ClientDashboard'; // ClientDashboard bileşenini import et
import FortuneTellerDashboard from './pages/FortuneTellerDashboard'; // FortuneTellerDashboard bileşenini import et
import EmailVerificationPage from './pages/EmailVerificationPage'; // EmailVerificationPage bileşenini import et
import LoginPage from './LoginPage'; // LoginPage bileşenini import et
import ClientFortuneTellerList from './pages/ClientFortuneTellerList'; // Falcı listesi sayfası import et
import PhotoSelectionPage from './pages/PhotoSelectionPage'; 
import FortuneTellingPage from './pages/FortuneTellingPage';// PhotoSelectionPage bileşenini import et
import MyFortunesPage from './pages/MyFortunesPage';
import RegisterPage from './pages/RegisterPage';
import UserDetailsPage from './pages/UserDetailsPage';
import AnsweredFortunesPage from './pages/AnsweredFortunesPage';
import EarnCoinsPage from './pages/EarnCoinsPage';
import ClientProfilePage from './pages/ClientProfilePage';
import FortuneTellerProfile from './pages/FortuneTellerProfile';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Varsayılan rota: LoginPage */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/fortuneteller-dashboard" element={<FortuneTellerDashboard />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/fortune-teller-list" element={<ClientFortuneTellerList />} />
        <Route path="/photo-selection" element={<PhotoSelectionPage />} /> 
        <Route path="/fortune-telling" element={<FortuneTellingPage />} />
        <Route path="/my-fortunes" element={<MyFortunesPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email-verification/:id" element={<EmailVerificationPage />} />
        <Route path="/user-details/:id" element={<UserDetailsPage />} />
        <Route path="/cevaplanan-fallar" element={<AnsweredFortunesPage />} />
        <Route path="/earn-coins" element={<EarnCoinsPage />} />
        <Route path="/profile" element={<ClientProfilePage />} />
        <Route path="/fortunetellerprofile" element={<FortuneTellerProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
