import bcrypt from "bcrypt"; 
import { UserRepository } from '../repositories/UserRepository';
import { UserModel } from '../models/UserModel';

export class UserService {
    static async createUser(
        name: string,
        lastname: string,
        username: string,
        email: string,
        password: string,
        gender: string
    )
    {
        if (!name || !lastname || !username || !email || !password || !gender) {
            throw new Error('Todos los campos son obligatorios');
        }

        const newAvatar = 'https://res.cloudinary.com/dczydmnqc/image/upload/v1729190833/Ecommers/usuarios/temnrpvpik0zptamtdus.jpg';

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const User = new UserModel(
            name,
            lastname,
            username,
            email,
            hash,
            gender,
            undefined,
            undefined,
            undefined,
            undefined,
            newAvatar
        );
        // llamamos al repositorio para crear el usuario
        const createdUser = await UserRepository.createUser(User);
        //retornamos el usuario creado
        return createdUser;
    }
    static async getUserByUsername(username: string): Promise<UserModel | null> {
        return await UserRepository.getUserByUsername(username);
    }
    static async getAllUser() {
        return await UserRepository.getAllUsers();
    }
    static async updatedData(username: string, updatedData: Partial<UserModel>): Promise<UserModel | null> {
        return await UserRepository.updateDataUser(username, updatedData);
    }

    static async deleteByUsername(username: string): Promise<void> {
        try{
        await UserRepository.deleteByUsername(username);
        }catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error}`);
        }
    }

    /* static async login(username, password) {
        if (!username || !password) {
            throw new Error('Usuario y contraseña son requeridos');
        }
    
        const user = await UserRepository.getUserByUsername(username);
        if (!user || user.password !== password) {
            throw new Error('Credenciales incorrectas');
        }
    
        return {
            id: user.id,
            names: user.names,
            username: user.username,
            email: user.email
        };
    }*/
}