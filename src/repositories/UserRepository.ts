import { INTEGER } from 'sequelize';
import { conectDB } from '../config/conectDB';
import { UserModel } from '../models/UserModel';
import { promises } from 'dns';


export class UserRepository {
    static async createUser(user: UserModel): Promise<UserModel> {
        const sql = `NSERT INTO USERS (Avatar, FullName, username, email, password, Gender) VALUES (${user.avatar}, ${user.FullName}, ${user.username}, ${user.email}, ${user.password}`;
        const result = await conectDB.execute(sql);

        if (!result.rows || result.rows.length === 0) {
            throw new Error('No se pudo crear el usuario');
        }

        // const id = result.rows[0].id;
        return new UserModel(user.FullName, user.username, user.email, user.password, user.gender, user.avatar, user.createdAt, user.status);
    }

    static async getUserByUsername(username: string): Promise<UserModel | null> {
        const sql = `SELECT * FROM users WHERE username = ${username}`;
        const result = await conectDB.execute(sql);
    
        if (!result.rows || result.rows.length === 0) {
            return null;
        }
    
        const row = result.rows[0];
        return new UserModel(
            String(row.FullName),
            String(row.username),
            String(row.email),
            String(row.password),
            String(row.gender),
            String(row.UserRole) ?? '', 
            new Date(String(row.createdAt)) ?? undefined,
            String(row.status) ?? '',
            parseInt(String(row.id)) ?? 0,
            String(row.avatar) ?? ''
        );
    }
    

    static async getAllUsers(): Promise<UserModel[]> {
        const sql = 'SELECT * FROM users';
        const result = await conectDB.execute(sql);
        if (!result.rows || result.rows.length === 0) {
            return [];
        }
        return result.rows.map(row => new UserModel(
            String(row.FullName),
            String(row.username),
            String(row.email),
            String(row.password),
            String(row.gender),
            String(row.UserRole) ?? '', 
            new Date(String(row.createdAt)) ?? undefined,
            String(row.status) ?? '',
            parseInt(String(row.id)) ?? 0,
            String(row.avatar) ?? ''
        ));
    }
    static async updatePassword(username: string, password:string): Promise<string> {
        const sql = `UPDATE users SET password = ${password} WHERE username = ${username}`;
        const result = await conectDB.execute(sql);
        if (!result.rows || result.rows.length === 0) {
            throw new Error('No se pudo actualizar la contraseña');
        }else{
            return 'Contraseña actualizada satisfactoriamente';
        }
    }

    static async deleteUser(username: string): Promise<string> {
        const sql = `DELETE FROM users WHERE username = ${username}`;
        const result = await conectDB.execute(sql);
        if (result.rows.length === 0) {
            throw new Error('no existe el usuario');
        }else{
            return 'Usuario:  eliminado satisfactoriamente';
        }
    }

    static async login(username: string, password: string): Promise<UserModel | null> {
        const sql = `SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
        const result = await conectDB.execute(sql);
        if (!result.rows || result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new UserModel(
            String(row.FullName),
            String(row.username),
            String(row.email),
            String(row.password),
            String(row.gender),
            String(row.UserRole) ?? '', 
            new Date(String(row.createdAt)) ?? undefined,
            String(row.status) ?? '',
            parseInt(String(row.id)) ?? 0,
            String(row.avatar) ?? ''
        );
    }
}