// FortuneList modelinin tanımı
class FortuneList {
  constructor({
    id,
    fortunetellerFirstName,
    fortunetellerLastName,
    answer,
    createDate,
    categories,
    score,
  }) {
    this.id = id;
    this.fortunetellerFirstName = fortunetellerFirstName;
    this.fortunetellerLastName = fortunetellerLastName;
    this.answer = answer;
    this.createDate = createDate ? new Date(createDate) : null;
    this.categories = categories;
    this.score= score;
  }

  static fromJson(json) {
    return new FortuneList({
      id: json.id,
      fortunetellerFirstName: json.fortunetellerFirstName,
      fortunetellerLastName: json.fortunetellerLastName,
      answer: json.answer,
      createDate: json.createDate,
      categories: json.categories || [],
      score: json.score,
    });
  }

  toJson() {
    return {
      id: this.id,
      fortunetellerFirstName: this.fortunetellerFirstName,
      fortunetellerLastName: this.fortunetellerLastName,
      answer: this.answer,
      createDate: this.createDate ? this.createDate.toISOString() : null,
      categories: this.categories,
      score: this.score,
    };
  }
}

export default FortuneList;
