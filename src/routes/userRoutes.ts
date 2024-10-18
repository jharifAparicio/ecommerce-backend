import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', UserController.getAllUser);
router.get('/user/:username', UserController.getbyUsername);

export default router;