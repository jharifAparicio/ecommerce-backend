import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.post('/User', UserController.createUser);
router.get('/Users', UserController.getAllUser);

export default router;