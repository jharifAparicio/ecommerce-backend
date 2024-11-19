import { DataBase } from "../config/turso";
import { BookModel } from "../models/BookModel";

export class BookRepository {
    static async createBook(book: BookModel): Promise<BookModel> {
        const newBook = 'INSERT INTO Books (Isbn, Title, Author, Description, Price, Stock, ImageUrl) VALUES (:Isbn ,:Title , :Author, :Description, :Price, :Stock, :ImageUrl) RETURNING *';
        try {
            const result = await DataBase.execute({
                sql: newBook,
                args: {
                    Isbn: book.ISBN,
                    Title: book.title,
                    Author: book.author,
                    Description: book.description,
                    Price: book.price,
                    Stock: book.stock,
                    ImageUrl: book.imageUrl,
                },
            });

            const createdBook = result.rows[0];

            return new BookModel(
                String(createdBook.Isbn),
                String(createdBook.Title),
                String(createdBook.Author),
                String(createdBook.Description),
                Number(createdBook.Price),
                Number(createdBook.Stock),
                String(createdBook.ImageUrl)
            );
        } catch (error) {
            console.error('error al crear libro: repository', error);
            throw new Error('Error al crear libro repository');
        }
    }
}