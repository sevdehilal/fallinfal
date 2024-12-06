class FortuneCategory {
    constructor(id, categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }

    // JSON verisinden FortuneCategory örneği oluşturma
    static fromJson(json) {
        return new FortuneCategory(json.id, json.categoryName);
    }

    // FortuneCategory nesnesini JSON formatına dönüştürme
    toJson() {
        return {
            id: this.id,
            categoryName: this.categoryName,
        };
    }
}

export default FortuneCategory;
