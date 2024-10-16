const BookServices = require('../services/BookServices');

class BookController {
    // Método para crear un libro
    static async create(req, res) {
        const { id, title, author, first_publish_year, cover_image } = req.body;
        try {
            const result = await BookServices.createBook(id, title, author, first_publish_year, cover_image);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un libro por su título
    static async getByTitle(req, res) {
        const { title } = req.params;

        try {
            const book = await BookServices.getBookByTitle(title);
            if (!book) {
                return res.status(404).json({ error: 'Libro no encontrado' });
            }
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todos los libros
    static async getAllBooks(req, res) {
        try {
            const books = await BookServices.getAllBooks();
            if (!books || books.length === 0) {
                return res.status(404).json({ error: 'No se encontraron libros.' });
            }
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para obtener los datos del libro y renderizar el formulario de edición
    static async getEditForm(req, res) {
        const { id } = req.params;
        try {
            const book = await BookServices.getBookByTitle(id); // Cambia esto si tu método busca por ID
            if (!book) {
                return res.status(404).send('Libro no encontrado');
            }
            res.render('books/editBook', { book });
        } catch (error) {
            res.status(500).send('Error al cargar el formulario de edición');
        }
    }

    // Método para manejar la actualización del libro
    static async updateBook(req, res) {
        const { id } = req.params;
        const { title, author, first_publish_year, cover_image } = req.body;

        try {
            await BookServices.updateBook(id, { title, author, first_publish_year, cover_image });
            res.redirect('/books'); // Redirige a la vista de libros después de actualizar
        } catch (error) {
            res.status(500).send('Error al actualizar el libro');
        }
    }

    static async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const result = await BookServices.deleteBook(id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BookController;
