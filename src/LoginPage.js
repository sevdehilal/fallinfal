import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from './ApiService';
import { Login } from './Login';
import './LoginPage.css';
import logo from './img/logo1.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginModel = new Login(username, password);

    try {
      const response = await ApiService.login(loginModel);

      if (response && response.success) {
        localStorage.setItem('userId', response.userId || '');
        localStorage.setItem('authToken', response.token || '');

        if (response.roles.includes('fortuneteller')) {
          const fortuneTellerId = response.fortuneTellerId || response.userId;
          localStorage.setItem('fortuneTellerId', fortuneTellerId);
        }

        if (!response.emailConfirmed) {
          navigate(`/email-verification/${response.userId}`);
        } else {
          if (response.roles.includes('client')) {
            localStorage.setItem('loggedInAs', 'client');
            navigate('/client-dashboard');
          } else if (response.roles.includes('fortuneteller')) {
            localStorage.setItem('loggedInAs', 'fortuneteller');
            navigate('/fortuneteller-dashboard');
          }
        }
      } else {
        setErrorMessage('Geçersiz kullanıcı adı veya şifre.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Google login URL'sini aç
      const popup = window.open(
        'https://fallinfal.com/api/Auth/LoginGoogle',
        '_blank',
        'width=500,height=600'
      );
  
      if (!popup) {
        throw new Error('Popup penceresi açılamadı.');
      }
  
      // Gelen response'ı yakalamak için mesaj dinleyicisi
      const response = await new Promise((resolve, reject) => {
        const messageHandler = (event) => {
          if (event.origin !== 'https://fallinfal.com') {
            console.error('Bilinmeyen domain:', event.origin);
            return;
          }
  
          if (event.data?.success) {
            resolve(event.data);
          } else {
            reject(new Error('Google Login başarısız.'));
          }
        };
  
        window.addEventListener('message', messageHandler, { once: true });
  
        const timeout = setTimeout(() => {
          reject(new Error('Login işlemi zaman aşımına uğradı.'));
        }, 60000);
  
        const interval = setInterval(() => {
          if (popup.closed) {
            clearInterval(interval);
            clearTimeout(timeout);
            reject(new Error('Pencere kapatıldı.'));
          }
        }, 500);
      });
  
      // API response işleme
      const { data } = response;
  
      // LocalStorage'a bilgileri kaydet
      localStorage.setItem('userId', data.id || '');
      localStorage.setItem('authToken', data.token || '');
      localStorage.setItem(
        'loggedInAs',
        data.roles.includes('client') ? 'client' : 'fortuneteller'
      );
  
      // Kullanıcıyı yönlendir
      if (data.roles.includes('client')) {
        navigate('/client-dashboard');
      } else if (data.roles.includes('fortuneteller')) {
        navigate('/fortuneteller-dashboard');
      }
    } catch (error) {
      console.error('Google Login Hatası:', error);
      setErrorMessage('Google girişinde bir hata oluştu.');
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} className="logo-image" alt="Logo" />
        <h1>Hesabınıza Giriş Yapın</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <button onClick={handleGoogleLogin} className="google-login-button">
          Google ile Giriş Yap
        </button>
        <p>
          <a href="#">Şifremi Unuttum</a>
        </p>
        <p>
          Hesabınız yok mu? <a href="/register">Kayıt Ol</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
