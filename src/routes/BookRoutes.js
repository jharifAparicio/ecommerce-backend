const { Router } = require('express');
const router = Router();
const BookController = require('../controllers/BookController');

router.post('/', BookController.create);
router.get('/:title', BookController.getByTitle);
router.get('/', BookController.getAllBooks);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await BookServices.getBookByTitle(id);  // Cambia según tu implementación de búsqueda por id
        if (book) {
            res.render('books/editBook', { book });
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, first_publish_year, cover_image } = req.body;

    try {
        await BookServices.updateBook(id, { title, author, first_publish_year, cover_image });
        res.redirect('/libros'); // Redirige al listado de libros después de la edición
    } catch (error) {
        res.status(500).send('Error actualizando el libro');
    }
});


module.exports = router;