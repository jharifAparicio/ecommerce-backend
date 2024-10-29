import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware";

const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', authenticateToken,authorizeAdmin, UserController.getAllUser);
router.get('/user/:username', authenticateToken ,UserController.getbyUsername);
router.put('/user/:username', authenticateToken, UserController.UpdateData.bind(UserController));
router.delete('/user/:username',authenticateToken,UserController.deleteByUsername);
router.post('/login', UserController.Login);

export default router;