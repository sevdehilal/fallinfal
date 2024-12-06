import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from './ApiService';
import { Login } from './Login';
import './LoginPage.css';
import logo from './img/logo1.png';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase-config'; // Firebase yapılandırmanızı içe aktarın


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
    const provider = new GoogleAuthProvider();
  
    try {
      // Google ile giriş için pop-up penceresi açıyoruz
      const result = await signInWithPopup(auth, provider);
  
      // Giriş yapan kullanıcının bilgilerini alıyoruz
      const user = result.user;
  
      // UID'yi sayıya dönüştürme
      const numericUserId = parseInt(user.uid.replace(/\D/g, ''), 10); // Alfanümerik karakterleri çıkararak sayıya dönüştürme
  
      console.log('Google Login User ID:', numericUserId); // Sayıya dönüştürülmüş ID'yi konsola yazdır
  
      // LocalStorage'a kullanıcının bilgilerini kaydediyoruz
      localStorage.setItem('userId', numericUserId);
      
      localStorage.setItem('authToken', await user.getIdToken());  // Firebase'den alınan idToken
  
      // Eğer kullanıcı email doğrulandıysa client-dashboard'e, doğrulanmamışsa fortune teller dashboard'a yönlendiriyoruz
      if (user.emailVerified) {
        navigate('/client-dashboard');
      } else {
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
