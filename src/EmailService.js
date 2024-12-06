import axios from 'axios';

class EmailService {
  static async verifyId(id) {
    const response = await axios.post(
      `https://fallinfal.com/api/Auth/SendEmailConfirmation?id=${id}`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('ID doğrulama başarısız.');
    }
  }
}

export default EmailService;
