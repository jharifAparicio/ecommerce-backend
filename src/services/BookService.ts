import { BookRepository } from "../repositories/BookRepository";
import { BookModel } from "../models/BookModel";

export class BookService {
    static async createBook(Isbn: string, title: string, author: string, Description: string, Price: number, Stock: number, ImageUrl: string) {
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
    };
    static async getBookByIsbn(isbn: string): Promise<BookModel | null> {
        return await BookRepository.getBookByIsbn(isbn);
    };
    static async getAllBooks() {
        return await BookRepository.getAllBooks();
    };
    static async updateData(isbn: string, updatedData: Partial<BookModel>): Promise<BookModel | null> {
        return await BookRepository.updateBook(isbn, updatedData);
    }
    static async deleteBook(isbn: string): Promise<void> {
        try {
            await BookRepository.deleteBook(isbn);
        } catch (error) {
            throw new Error(`Error al eliminar el libro: ${error}`);
        }
    }
}