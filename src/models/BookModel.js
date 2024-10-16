class Book {
    constructor(id, title, author,first_publish_year,cover_image,stock){
        this.id = id;
        this.title = title;
        this.author = author;
        this.first_publish_year = first_publish_year;
        this.stock = stock;
        this.cover_image = cover_image;
    }
}

module.exports = Book;