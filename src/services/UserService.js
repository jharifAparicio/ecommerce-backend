const UserRepository = require('../repositories/UserRepository');

class UserService {
    static async createUser(names, username, email, password) {
        if (!names || !username || !email || !password) {
            throw new Error('Todos los campos son obligatorios');
        }
        const user = {names, username, email, password};
        return UserRepository.createUser(user);
    }

    static async getUserByUsername(username) {
        return await UserRepository.getUserByUsername(username);
    }

    static async getAllUser() {
        return await UserRepository.getAllUsers();
    }

    static async updatePassword(username, password) {
        return await UserRepository.updatePassword(username, password);
    }

    static async deleteUser(username) {
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
    }
    
}

module.exports = UserService;