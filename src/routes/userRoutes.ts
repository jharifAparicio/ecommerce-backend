import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";

const router = Router();

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

export default router;