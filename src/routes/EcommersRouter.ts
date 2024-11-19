import { Router } from "express";
// controladores
import { UserController } from "../controllers/UserController";
import { BookController } from "../controllers/BookController";
// middleware
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";

const router = Router();

// rutas de usuario
//crear usuario
router.post('/user', UserController.createUser);
// traer usuario por username
router.get('/user/:username',authenticateToken,UserController.getbyUsername);
// traer todos los usuarios
router.get('/users', authenticateToken, authorizeAdmin, UserController.getAllUser);
// actualizar usuario
router.put('/user/:username',authenticateToken, UserController.UpdateData.bind(UserController));
// eliminar usuario
router.delete('/user/:username',authenticateToken, UserController.deleteByUsername);
// login
router.post('/login', UserController.Login);

// rutas de Libros
//crear libro
router.post('/book', BookController.createBook);
// traer libro por ISBN
router.get('/book/:isbn', BookController.getBookByIsbn);
// traer todos los libros
router.get('/books', BookController.getAllBooks);
// actualizar libro
router.put('/book/:isbn', BookController.updateData);
// eliminar libro
router.delete('/book/:isbn', BookController.deleteBook);


export default router;