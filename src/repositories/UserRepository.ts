import { turso } from '../config/conectDB';
import { UserModel } from '../models/UserModel';


export class UserRepository {
    static async createUser(user: UserModel): Promise<UserModel> {
        const defaultAvatar = 'https://res.cloudinary.com/dczydmnqc/image/upload/v1729190833/Ecommers/usuarios/temnrpvpik0zptamtdus.jpg';
        const NewAvatar = user.avatar || defaultAvatar;

        const consult = 'INSERT INTO USERS (Avatar, FullName, username, email, password, Gender) VALUES (:avatar, :name, :username, :email, :password, :gender) RETURNING *';
        
        try{
            const result = await turso.execute({
                sql: consult,
                args: {
                    avatar: NewAvatar,
                    name: user.FullName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    gender: user.gender
                },
            });

            const createdUser = result.rows[0];
            return new UserModel(
                String(createdUser.FullName),
                String(createdUser.username),
                String(createdUser.email),
                String(createdUser.password),
                String(createdUser.gender),
                String(createdUser.UserRole),
                createdUser.createAt ? new Date() : undefined,
                String(createdUser.status) ?? '',
                Number(createdUser.id),
                String(createdUser.avatar),
            );
        }catch(error){
            console.error('error al crear usuario: repository', error);
            throw new Error ('Error al crear usuario repository');
        }
    }
    /*static async getUserByUsername(username: string): Promise<UserModel | null> {
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
    }*/
    static async getAllUsers(): Promise<UserModel[]> {
        const sql = 'SELECT * FROM USERS';
        const result = await turso.execute(sql);
        if (!result.rows || result.rows.length === 0) return [];
        return result.rows.map(row => new UserModel(
            row.FullName ? String(row.FullName):"",
            row.username ? String(row.username):"",
            row.email ? String(row.email):"",
            row.password ? String(row.password): "",
            row.Gender ? String(row.Gender): "",
            row.UserRole ? String(row.UserRole): "user", 
            row.create_at ? new Date(String(row.created_at)): undefined,
            row.status ? String(row.status): "active",
            row.Id ? parseInt(String(row.Id)): 0,
            row.Avatar ? String(row.Avatar): "Avatar no disponible"
        ));
    }
    
    /*static async updatePassword(username: string, password:string): Promise<string> {
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
    }*/
}