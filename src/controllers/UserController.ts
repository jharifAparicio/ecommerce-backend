import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserModel } from "models/UserModel";

export class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { FullName, username, email, password, gender } = req.body;
            const newUser = await UserService.createUser(FullName, username, email, password, gender);
            res.status(201).json({ user: newUser });
        } catch (error) {
            res.status(400).json({
                message: "Error al crear el usuario controller" + error
            });
        }
    }

    static async getbyUsername(req: Request, res: Response): Promise<void> {
        const username = req.params.username;

        try {
            const user = await UserService.getUserByUsername(username);
            if (user) res.status(200).json(user); res.status(404).json({ message: 'Usuario no encontrado' });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el usuario controller -> " + error,
            });
        }
    }

    static async getAllUser(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserService.getAllUser();
            res.json(users);
        } catch (error) {
            res.status(400).json({
                message: "Error al obtener los usuarios controller -> " + error
            });
        }
    }

    static async updatePassword(req:Request, res:Response): Promise<void> {
        const { username } = req.params;
        const updatedData: Partial<UserModel> = req.body;

        try {
            const updatedUser = await UserService.updatedData(username, updatedData);
            if (updatedUser) res.status(200).json(updatedUser);
            res.status(404).json({ message: 'Usuario no encontrado' });
        } catch (error) {
            res.status(500).json({ 
                message: "Error al actualizar el usuario controller -> " + error,
            });
        }
    }

    static async deleteByUsername(req: Request, res:Response): Promise<void> {
        const { username } = req.params;

        try {
            const result = await UserService.deleteByUsername(username);
            res.json(result);
        } catch (error) {
            res.status(500).json({ 
                message: "Error al eliminar el usuario -> "+ error 
            });
        }
    }

    /*static async login(req, res) {
        console.log('Login attempt:', req.body);
        const { username, password } = req.body;
        try {
            const user = await UserService.login(username, password);
            req.session.user = user;
            req.session.loggedin = true;
            console.log('Session after login:', req.session);  // Verificar la sesión
            res.json({ success: true, message: 'Login exitoso', redirectUrl: '/libros' });
        } catch (error) {
            res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
        }
    }    

    static logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).json({ success: false, error: 'Error al cerrar sesión' });
            }
            res.json({ success: true, message: 'Sesión cerrada exitosamente' });
        });
    }*/
}