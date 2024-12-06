class User {
    constructor({ firstName, lastName, gender, dateOfBirth, occupation, maritalStatus, userName, email, password }) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.dateOfBirth = new Date(dateOfBirth); // Date nesnesine dönüştürülmeli
      this.occupation = occupation;
      this.maritalStatus = maritalStatus;
      this.userName = userName;
      this.email = email;
      this.password = password;
    }
  
    static fromJson(json) {
      return new User({
        firstName: json.firstName,
        lastName: json.lastName,
        gender: json.gender,
        dateOfBirth: new Date(json.dateOfBirth),
        occupation: json.occupation,
        maritalStatus: json.maritalStatus,
        userName: json.userName,
        email: json.email,
        password: json.password,
      });
    }
  
    toJson() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth.toISOString(),
        occupation: this.occupation,
        maritalStatus: this.maritalStatus,
        userName: this.userName,
        email: this.email,
        password: this.password,
      };
    }
  }
  
  export { User }; // `User` sınıfını export etmelisiniz
  