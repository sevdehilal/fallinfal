import { LoginResponse } from './Login';  
import { FortuneTeller } from './models/FortuneTeller'; 
import FortuneCategory from './models/FortuneCategory';

class ApiService {
    constructor() {
        this.apiUrl = "https://fallinfal.com/api/Auth/login"; // Login API URL
        this.fortuneTellerUrl = "https://fallinfal.com/api/Client/GetAllFortuneTeller"; // Falcıların API URL'si
        this.categoryUrl = "https://fallinfal.com/api/Category/GetAllCategory"; // Kategoriler için API URL
        this.saveFortuneUrl = "http://fallinfal.com/api/Application/AddApplication"; // Fal gönderme URL
        
    }

    // Login metodu
    async login(loginModel) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(loginModel.toJson()), // loginModel'i JSON'a çevirme
            });

            if (response.status === 200) {
                const data = await response.json(); // JSON verisini al
                console.log('API Response:', data); // Gelen veriyi konsola yazdır

                // LoginResponse.fromJson çağrısı ile veri parse edilir
                return LoginResponse.fromJson(data); // LoginResponse kullanımı
            } else {
                console.error('Login failed with status:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Login Error:', error);
            return null;
        }
    }

        // Servis: FortuneTellerService.js
    async fetchFortuneTellers() {
        try {
        const response = await fetch(this.fortuneTellerUrl, {
            method: 'GET',
            headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*",
            },
        });
    
        if (response.status === 200) {
            const data = await response.json();
            console.log('API Verisi:', data);
    
            if (data && Array.isArray(data.data)) {
            // 'data' dizisindeki her elemanı FortuneTeller modeline dönüştürme
            return data.data.map(fortuneTeller => new FortuneTeller(fortuneTeller));
            } else {
            console.error('Invalid data structure for fortune tellers');
            return [];
            }
        } else {
            console.error('Failed to load fortune tellers, status:', response.status);
            throw new Error('Failed to load fortune tellers');
        }
        } catch (error) {
        console.error('Fetch Fortune Tellers Error:', error);
        return [];
        }
    }
    

        // Kategorileri çekme metodu
    async fetchFortuneCategories() {
        try {
            const response = await fetch(this.categoryUrl, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                // Burada, data.data olduğu varsayılıyor; veriler data içinde olacak
                if (Array.isArray(data.data)) {
                    return data.data.map(item => FortuneCategory.fromJson(item));
                } else {
                    console.error('Invalid data structure: data is not an array or is missing.');
                    return [];
                }
            } else {
                console.error('Failed to load categories, status:', response.status);
                return [];
            }
        } catch (error) {
            console.error('Fetch Categories Error:', error);
            return [];
        }
    }

        // Base64 dönüşüm fonksiyonu
    convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Fotoğrafı base64'e çevir
            reader.onloadend = () => {
                const base64String = reader.result;
                // data:image/png;base64, kısmını kaldır
                const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
                resolve(base64Data);
            };
            reader.onerror = (error) => {
                console.error('Base64 dönüşüm hatası:', error);
                reject(error);
            };
        });
    }

    // Fortune gönderme
    async saveFortune({ clientId, fortunetellerId, categoryIds, photos }) {
        try {
            // Kategorileri benzersiz hale getir ve sayısal değere dönüştür
            const uniqueCategoryIds = [...new Set(categoryIds.map(Number))];

            // Fotoğrafları base64'e dönüştür ve başlık kısmını kaldır
            const base64Photos = await Promise.all(photos.map(photo => this.convertToBase64(photo)));

            const requestBody = {
                ClientId: clientId,
                FortunetellerId: fortunetellerId,
                CategoryIds: uniqueCategoryIds,
                Photo1: base64Photos[0],
                Photo2: base64Photos[1],
                Photo3: base64Photos[2],
            };

            console.log('Request Body:', JSON.stringify(requestBody, null, 2));

            const response = await fetch(this.saveFortuneUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const text = await response.text();  // Yanıtı text olarak al
            console.log('API Yanıtı:', text);    // Yanıtı logla
            const jsonResponse = JSON.parse(text);  // JSON'a çevir

            const responseText = await response.text();
            console.log('API Yanıtı (Düz Metin):', responseText);

            if (response.status !== 200) {
                console.error('API Hatası:', responseText);
                return false;
            }

            try {
                const responseData = JSON.parse(responseText);
                console.log('API Yanıtı (JSON):', responseData);
                return true;
            } catch (error) {
                console.error('JSON Parse Hatası:', error);
                console.error('Yanıt metni:', responseText);
                return false;
            }
        } catch (error) {
            console.error('Save Fortune Error:', error);
            return false;
        }
    }

}

export default new ApiService();
