const UserDB = require('../../config/users');
const UserModel = require('../models/UserModel');

class UserRepository {
    static async createUser(user) {
        const sql = 'INSERT INTO users (names, username, email, password) VALUES (?,?,?,?)';
        return new Promise((resolve, reject) => {
            UserDB.run(sql, [user.names,user.username,user.email,user.password], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({id: this.lastID, ...user});
            });
        });
    }

    static async getUserByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        return new Promise((resolve, reject) => {
            UserDB.get(sql, [username], (err, row) => {
                if (err) {
                    return reject(err);
                }
                if (!row) {
                    return resolve(null);
                }
                const user = new UserModel(row.id,row.names,row.username,row.email,row.password);
                resolve(user);
            });
        });
    }

    static async getAllUsers() {
        const sql = 'SELECT * FROM users';
        return new Promise((resolve, reject) => {
            UserDB.all(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                const users = rows.map(row => new UserModel(row.id,row.names,row.username,row.email,row.password));
                resolve(users);
            });
        });
    }
    static async updatePassword(username, password) {
        const sql = 'UPDATE users SET password = ? WHERE username = ?';
        return new Promise((resolve, reject) => {
            UserDB.run(sql, [password, username], function(err) {
                if (err) {
                    return reject(err);
                }
                if (this.changes === 0) {
                    return reject({message: 'Usuario no encontrado', status: 404});
                }
                resolve({message: `contraseña actualizada ${username}`});
            });
        });
    }

    static async deleteUser(username) {
        const sql = 'DELETE FROM users WHERE username = ?';
        return new Promise((resolve, reject) => {
            UserDB.run(sql, [username], function(err) {
                if (err) {
                    return reject(err);
                }
                if (this.changes === 0) {
                    return reject({message: 'Usuario no encontrado', status: 404});
                }
                resolve({message: `Usuario eliminado ${username}`});
            });
        });
    }

    static async login(username) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        return new Promise((resolve, reject) => {
            UserDB.get(sql, [username], (err, row) => {
                if (err) {
                    return reject(err);
                }
                if (!row) {
                    return resolve(null);
                }
                const user = new UserModel(row.id,row.names,row.username,row.email,row.password);
                resolve(user);
            });
        });
    }
}
module.exports = UserRepository;