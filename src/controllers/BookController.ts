import { Request, Response } from "express";
import { BookService } from "../services/BookService";
// import { BookModel } from "models/BookModel";

export class BookController {
    static async createBook(req: Request, res: Response): Promise<void> {
        try {
            const { ISBN, title, author, description, price, stock, imageUrl } = req.body;
            const newBook = await BookService.createBook(ISBN, title, author, description, price, stock, imageUrl);
            res.status(201).json({ book: newBook });
        } catch (error) {
            res.status(400).json({
                message: "Error al crear el libro controller" + error
            });
        }
    }
}