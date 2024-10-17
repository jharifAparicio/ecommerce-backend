import { conectDB } from '../config/conectDB';
import { UserModel } from '../models/UserModel';


export class UserRepository {
    static async createUser(user: UserModel): Promise<UserModel> {
        const defaultAvatar = 'https://res.cloudinary.com/dczydmnqc/image/upload/v1729190833/Ecommers/usuarios/temnrpvpik0zptamtdus.jpg';
        const avatar = user.avatar || defaultAvatar;

        const sql = `INSERT INTO USERS (FullName, username, email, password, Gender, Avatar) VALUES ('${user.avatar}', '${user.FullName}', '${user.username}', '${user.email}', '${user.password}', '${avatar}')`;
        
        try{
            const result = await conectDB.execute(sql);
            /*if(result.rows.length === 0){
                throw new Error('No se puede crear usuario');
            }*/
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
            console.error('error al crear usuario:', error);
            throw new Error ('Error al crear usuario');
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
    }*/
}