import { BookRepository } from "../repositories/BookRepository";
import { BookModel } from "../models/BookModel";

export class BookService {
    static async createBook(Isbn: string,title: string, author: string, Description: string, Price: number, Stock: number, ImageUrl: string) {
        if (!title || !author || !Description || !Price || !Stock || !ImageUrl) {
            throw new Error('Todos los campos son obligatorios');
        }
        const book = new BookModel(
            Isbn,
            title,
            author,
            Description,
            Price,
            Stock,
            ImageUrl
        );
        const BookCreated = await BookRepository.createBook(book);
        return BookCreated;
    }
}