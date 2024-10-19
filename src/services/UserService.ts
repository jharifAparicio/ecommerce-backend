import { UserRepository } from '../repositories/UserRepository';
import { UserModel } from '../models/UserModel';

export class UserService {
    static async createUser(
        FullName: string,
        username: string,
        email: string,
        password: string,
        gender: string,
        avatar?: string
    )
    {
        if (!FullName || !username || !email || !password || !gender) {
            throw new Error('Todos los campos son obligatorios');
        }

        const newAvatar = avatar  ?? 'https://res.cloudinary.com/dczydmnqc/image/upload/v1729190833/Ecommers/usuarios/temnrpvpik0zptamtdus.jpg';

        const User = new UserModel(
            FullName,
            username,
            email,
            password,
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

    /*static async deleteUser(username) {
        return await UserRepository.deleteUser(username);
    }

    static async login(username, password) {
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