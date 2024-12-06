class ClientModel {
    constructor({
      userName = "",
      firstName = "",
      lastName = "",
      dateofBirth = "",
      experience = "",
      requirementCredit = 0,
      gender = "",
      email = "",
      rating = 0,
      totalCredit = 0,
    }) {
      this.userName = userName;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateofBirth = dateofBirth;
      this.experience = experience;
      this.requirementCredit = requirementCredit;
      this.gender = gender;
      this.email = email;
      this.rating = rating;
      this.totalCredit = totalCredit;
    }
  
    // Özel formatlama veya ek metotlar burada tanımlanabilir
  }
  export default ClientModel;
  