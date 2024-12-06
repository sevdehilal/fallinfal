class FortuneForFortuneTeller {
    constructor({
      id,
      firstName,
      lastName,
      gender,
      occupation,
      maritalStatus,
      dateOfBirth,
      categories,
      createDate,
      imageData1,
      imageData2,
      imageData3,
    }) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.occupation = occupation;
      this.maritalStatus = maritalStatus;
      this.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
      this.categories = categories;
      this.createDate = createDate ? new Date(createDate) : null;
      this.imageData1 = imageData1;
      this.imageData2 = imageData2;
      this.imageData3 = imageData3;
    }
  
    static fromJson(json) {
      return new FortuneForFortuneTeller({
        id: json.id,
        firstName: json.firstName,
        lastName: json.lastName,
        gender: json.gender,
        occupation: json.occupation,
        maritalStatus: json.maritalStatus,
        dateOfBirth: json.birthDate,
        categories: json.categories || [],
        createDate: json.createDate,
        imageData1: json.imageData1,
        imageData2: json.imageData2,
        imageData3: json.imageData3,
      });
    }
  
    toJson() {
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        occupation: this.occupation,
        maritalStatus: this.maritalStatus,
        birthDate: this.dateOfBirth ? this.dateOfBirth.toISOString() : null,
        categories: this.categories,
        createDate: this.createDate ? this.createDate.toISOString() : null,
        imageData1: this.imageData1,
        imageData2: this.imageData2,
        imageData3: this.imageData3,
      };
    }
  }
  
  export default FortuneForFortuneTeller;
  