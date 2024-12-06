// models/FortuneTeller.js
class FortuneTeller {
  constructor({ id, firstName, lastName, gender, experience, userName, email, password, rating, requirementCredit, totalVoted }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.experience = experience;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.rating = rating;
    this.requirementCredit = requirementCredit;
    this.totalVoted = totalVoted; // Burada totalVoted ekledim
  }

  static fromJson(json) {
    return new FortuneTeller(json);
  }

  toJson() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      experience: this.experience,
      userName: this.userName,
      email: this.email,
      password: this.password,
      rating: this.rating,
      requirementCredit: this.requirementCredit,
      totalVoted: this.totalVoted, // Burada totalVoted alanını döndürüyoruz
    };
  }
}

export { FortuneTeller };
