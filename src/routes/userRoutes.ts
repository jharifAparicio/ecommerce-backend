import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

//crear usuario
router.post('/user', UserController.createUser);
// traer usuario por username
router.get('/user/:username', UserController.getbyUsername);
// traer todos los usuarios
router.get('/users', UserController.getAllUser);
// actualizar usuario
router.put('/user/:username', UserController.UpdateData.bind(UserController));
// eliminar usuario
router.delete('/user/:username',UserController.deleteByUsername);
// login
router.post('/login', UserController.Login);

export default router;