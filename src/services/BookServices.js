const BookRepository = require('../repositories/BookRepository');

class  BookServices{
    static async createBook(id,title,first_publish_year,cover_image){
        const book = {id,title,first_publish_year,cover_image};
        return BookRepository.createBook(book);
    }
    static async getBookByTitle(title){
        return BookRepository.getBookByTitle(title);
    }
    static async getAllBooks(){
        return BookRepository.getAllBooks();
    }
    static async updateBook(id, updatedBook) {
        return BookRepository.updateBook(id, updatedBook);
    }
    static async deleteBook(id){
        return BookRepository.deleteBook(id);
    }
}

module.exports = BookServices;