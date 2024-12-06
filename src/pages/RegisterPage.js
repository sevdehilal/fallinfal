import React, { useState } from 'react';
import { AuthService } from '../AuthService';
import { FortuneTeller } from '../models/FortuneTeller';
import { User } from '../models/User';
import './RegisterPage.css';


const RegisterPage = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0); // 0: Kayıt Ol, 1: Falcı Olarak Kayıt Ol

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    experience: '', 
    dateOfBirth: '',
    occupation: '',
    maritalStatus: '',
    userName: '',
    email: '',
    password: '',
    selectedCategory: '',
  });

  const categories = ['Tarot', 'Kahve Falı', 'El Falı', 'Aşk Falı'];
  const genders = ['Kız', 'Erkek'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async () => {
    const newUser = new User({
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      occupation: formData.occupation,
      maritalStatus: formData.maritalStatus,
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    });

    const success = await AuthService.registerUser(newUser);

    if (success) {
      alert('Registration successful!');
     
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  const registerFortuneTeller = async () => {
    const newFortuneTeller = new FortuneTeller({
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      experience: formData.experience,
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    });

    const success = await AuthService.registerFortuneTeller(newFortuneTeller);

    if (success) {
      alert('Fortune Teller Registration successful!');
      // Gerekirse yönlendirme yapabilirsiniz
    } else {
      alert('Fortune Teller Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <div className="button-group">
        <button
          onClick={() => setSelectedButtonIndex(0)}
          style={{ backgroundColor: selectedButtonIndex === 0 ? '#007BFF' : '#CCC' }}
        >
          Kayıt Ol
        </button>
        <button
          onClick={() => setSelectedButtonIndex(1)}
          style={{ backgroundColor: selectedButtonIndex === 1 ? '#007BFF' : '#CCC' }}
        >
          Falcı Olarak Kayıt Ol
        </button>
      </div>

      <form className="register-form">
        <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
        />
        <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
        />
        {selectedButtonIndex === 1 && (
            <input
            type="text"
            name="experience"
            placeholder="Deneyim (Yıl olarak)"
            value={formData.experience}
            onChange={handleInputChange}
            />
        )}
        <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
        >
            <option value="">Cinsiyet Seçin</option>
            {genders.map((gender) => (
            <option key={gender} value={gender}>
                {gender}
            </option>
            ))}
        </select>
        {selectedButtonIndex === 0 && (
            <>
            <input
                type="text"
                name="dateOfBirth"
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="maritalStatus"
                placeholder="Marital Status"
                value={formData.maritalStatus}
                onChange={handleInputChange}
            />
            </>
        )}
        <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleInputChange}
        />
        {selectedButtonIndex === 1 && (
            <select
            name="selectedCategory"
            value={formData.selectedCategory}
            onChange={handleInputChange}
            >
            <option value="">Kategori Seçin</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                {category}
                </option>
            ))}
            </select>
        )}
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
        />
        <button
            type="button"
            onClick={selectedButtonIndex === 0 ? registerUser : registerFortuneTeller}
        >
            {selectedButtonIndex === 0 ? 'Register' : 'Onaya Sun'}
        </button>
        </form>

    </div>
  );
};

export default RegisterPage;
