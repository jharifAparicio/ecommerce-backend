const BookDB = require('../../config/book');
const BookModel = require('../models/BookModel');

class BookRepository {
    static async createBook(book) {
        const { id, title, author,first_publish_year,cover_image } = book;
        const sql = 'INSERT INTO books (id, title, author,first_publish_year,cover_image,stock) VALUES (?,?,?,?,?)';
        return new Promise((resolve, reject) => {
            BookDB.run(sql, [id, title, author,first_publish_year,cover_image,stock], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({id: this.lastID, ...book});
            });
        });
    }
    
    static async getBookByTitle(title) {
        const sql = 'SELECT * FROM books WHERE title = ?';
        return new Promise((resolve, reject) => {
            BookDB.get(sql, [title], (err, row) => {
                if (err) {
                    return reject(err);
                }
                if (!row) {
                    return resolve(null);
                }
                const book = new BookModel(row.id,row.title,row.author,row.first_publish_year,row.cover_image);
                resolve(book);
            });
        });
    }

    static async getAllBooks() {
        const sql = 'SELECT * FROM books';
        return new Promise((resolve, reject) => {
            BookDB.all(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                const books = rows.map(row => new BookModel(row.id,row.title,row.author,row.first_publish_year,row.cover_image,row.stock));
                resolve(books);
            });
        });
    }

    static async updateBook(id, updatedBook) {
        const { title, author, first_publish_year, cover_image } = updatedBook;
        const sql = 'UPDATE books SET title = ?, author = ?, first_publish_year = ?, cover_image = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            BookDB.run(sql, [title, author, first_publish_year, cover_image, id], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({ message: `Libro actualizado con éxito`, updatedBook });
            });
        });
    }    

    static async deleteBook(title) {
        const sql = 'DELETE FROM books WHERE id = ?';
        return new Promise((resolve, reject) => {
            BookDB.run(sql, [title], function(err) {
                if (err) {
                    return reject(err);
                }
                if (this.changes === 0) {
                    return reject({message: 'Libro no encontrado', status: 404});
                }
                resolve({message: `Libro eliminado ${title}`});
            });
        });
    }
}

module.exports = BookRepository;