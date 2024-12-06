// Login.js
export class Login {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }

  toJson() {
    return {
      userName: this.userName,
      password: this.password,
    };
  }
}

// LoginResponse.js
export class LoginResponse {
  constructor(success, message, token, userId, email, emailConfirmed, roles) {
    this.success = success;
    this.message = message;
    this.token = token;
    this.userId = userId;
    this.email = email;
    this.emailConfirmed = emailConfirmed;
    this.roles = roles;
  }

  // JSON'dan dönüşüm işlemi
  static fromJson(json) {
    return new LoginResponse(
      json.success,
      json.message,
      json.data.token, // data içinden token alınıyor
      json.data.id,    // data içinden userId alınıyor
      json.data.email, // data içinden email alınıyor
      json.data.emailConfirmed, // data içinden emailConfirmed alınıyor
      json.data.roles || []     // data içinden roles alınıyor, yoksa boş dizi döndürülüyor
    );
  }

  // Modelden JSON'a dönüşüm işlemi
  toJson() {
    return {
      success: this.success,
      message: this.message,
      data: { // Verileri 'data' objesi içine yerleştiriyoruz
        token: this.token,
        userId: this.userId,
        email: this.email,
        emailConfirmed: this.emailConfirmed,
        roles: this.roles,
      },
    };
  }
}
