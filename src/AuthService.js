import axios from 'axios';
import { User } from './models/User';
import { FortuneTeller } from './models/FortuneTeller';

const API_BASE_URL = 'https://fallinfal.com/api/Auth';

export const AuthService = {
    registerUser: async (user) => {
        try {
            const response = await axios.post(
            `${API_BASE_URL}/RegisterClient`,
            user.toJson(),  // `toJson` fonksiyonuyla kullanıcı verilerini gönderiyoruz
            { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
            console.log('Kullanıcı başarıyla kaydedildi');
            return true;
            } else {
            console.error(`Error: ${response.status} - ${response.data}`);
            return false;
            }
        } catch (error) {
            console.error('Exception:', error);
            return false;
        }
    },

  registerFortuneTeller: async (fortuneTeller) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/RegisterFortuneTeller`,
        fortuneTeller.toJson(),
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        console.log('Falcı başarıyla kaydedildi');
        return true;
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
        return false;
      }
    } catch (error) {
      console.error('Exception:', error);
      return false;
    }
  },
};
