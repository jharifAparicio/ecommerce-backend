import { DataBase } from "../config/turso";
import { BookModel } from "../models/BookModel";

//CRUD
export class BookRepository {
    static async createBook(book: BookModel): Promise<BookModel> {
        const newBook = 'INSERT INTO Books (ISBN, Title, Author, Description, Price, Stock, ImageUrl, Category) VALUES (:Isbn ,:Title , :Author, :Description, :Price, :Stock, :ImageUrl, :Category) RETURNING *';
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
                    Category: book.Idcategory,
                    ImageUrl: book.imageUrl,
                },
            });
            const createdBook = result.rows[0];

            return new BookModel(
                String(createdBook.ISBN),
                String(createdBook.Title),
                String(createdBook.Author),
                String(createdBook.Description),
                Number(createdBook.Price),
                Number(createdBook.Stock),
                String(createdBook.ImageUrl),
                Number(createdBook.Category),
                Number(createdBook.Id)
            );
        } catch (error) {
            console.error('error al crear libro: repository', error);
            throw new Error('Error al crear libro repository');
        }
    };

    static async getBookByIsbn(isbn: string): Promise<BookModel | null> {
        const search = " SELECT * FROM Books INNER JOIN Categories ON Books.Category = Categories.Id WHERE  isbn= :isbn";
        const result = await DataBase.execute({
            sql: search,
            args: { isbn },
        });
        try {
            const getBook = result.rows[0];
            return new BookModel(
                String(getBook.ISBN),
                String(getBook.Title),
                String(getBook.Author),
                String(getBook.Description),
                Number(getBook.Price),
                Number(getBook.Stock),
                String(getBook.ImageUrl),
                Number(getBook.Category),
                Number(getBook.Id),
                String(getBook.Name)
            );
        }
        catch (error) {
            console.error('error al buscar libro: repository', error);
            throw new Error('Error libro no encontrado').message;
        }
    }
    static async getAllBooks(): Promise<BookModel[]> {
        const searchBooks = 'SELECT * FROM Books INNER JOIN Categories ON Books.Category = Categories.Id ';
        const result = await DataBase.execute(searchBooks);
        if (!result.rows || result.rows.length === 0) return [];
        return result.rows.map((row => new BookModel(
            row.ISBN ? String(row.ISBN) : "",
            row.Title ? String(row.Title) : "",
            row.Author ? String(row.Author) : "",
            row.Description ? String(row.Description) : "",
            row.Price ? Number(row.Price) : 0,
            row.Stock ? Number(row.Stock) : 0,
            row.ImageUrl ? String(row.ImageUrl) : "",
            row.Category ? Number(row.Category) : 0,
            row.Id ? Number(row.Id) : 0,
            row.Name ? String(row.Name) : ""
        )));
    };
    static async updateBook(isbn: string, updatedData: Partial<BookModel>): Promise<BookModel | null> {
        const editBook = "UPDATE Books SET Title = :Title, Author = :Author, Description = :Description, Price = :Price, Stock = :Stock, ImageUrl = :ImageUrl WHERE Isbn = :Isbn RETURNING *";
        try {
            const updatedBook = await DataBase.execute({
                sql: editBook,
                args: {
                    Isbn: isbn,
                    Title: updatedData.title ?? null,
                    author: updatedData.author ?? null,
                    Description: updatedData.description ?? null,
                    Price: updatedData.price ?? null,
                    Stock: updatedData.stock ?? null,
                    ImageUrl: updatedData.imageUrl ?? null,
                },
            });
            if (updatedBook.rows.length === 0) return null;
            const bookUpdated = updatedBook.rows[0];
            return new BookModel(
                String(bookUpdated.Isbn),
                String(bookUpdated.Title),
                String(bookUpdated.Author),
                String(bookUpdated.Description),
                Number(bookUpdated.Price),
                Number(bookUpdated.Stock),
                String(bookUpdated.ImageUrl),
                Number(bookUpdated.Category),
                Number(bookUpdated.id)
            );
        } catch (error) {
            console.error('error al editar libro: repository', error);
            throw new Error('Error al editar libro repository');
        }
    };
    static async deleteBook(isbn: string): Promise<void> {
        const deleteBook = 'DELETE FROM Books WHERE Isbn = :Isbn';
        try {
            await DataBase.execute({
                sql: deleteBook,
                args: { Isbn: isbn },
            });
        } catch (error) {
            console.error('error al eliminar libro: repository', error);
            throw new Error('Error al eliminar libro repository');
        }
    };
}