import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.post('/User', UserController.createUser);

export default router;