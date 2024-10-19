import { turso } from '../config/conectDB';
import { UserModel } from '../models/UserModel';


export class UserRepository {
    static async createUser(user: UserModel): Promise<UserModel> {
        const defaultAvatar = 'https://res.cloudinary.com/dczydmnqc/image/upload/v1729190833/Ecommers/usuarios/temnrpvpik0zptamtdus.jpg';
        const NewAvatar = user.avatar || defaultAvatar;

        const newUser = 'INSERT INTO USERS (Avatar, FullName, username, email, password, Gender) VALUES (:avatar, :name, :username, :email, :password, :gender) RETURNING *';
        
        try{
            const result = await turso.execute({
                sql: newUser,
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
                String(createdUser.Gender),
                String(createdUser.UserRole),
                createdUser.create_At ? new Date() : undefined,
                String(createdUser.status) ?? '',
                Number(createdUser.Id),
                String(createdUser.Avatar),
            );
        }catch(error){
            console.error('error al crear usuario: repository', error);
            throw new Error ('Error al crear usuario repository');
        }
    }
    static async getUserByUsername(username: string): Promise<UserModel | null> {
        const buscar = "SELECT * FROM USERS WHERE username = :username";
        const result = await turso.execute({
            sql: buscar,
            args: { username },
        });

        if (!result.rows || result.rows.length === 0) {
            return null;
        }else{
            const getUser = result.rows[0];
            return new UserModel(
                String(getUser.FullName),
                String(getUser.username),
                String(getUser.email),
                String(getUser.password),
                String(getUser.Gender),
                String(getUser.UserRole),
                getUser.create_At ? new Date() : undefined,
                String(getUser.status) ?? '',
                Number(getUser.Id),
                String(getUser.Avatar),
            );
        }
    }

    static async getAllUsers(): Promise<UserModel[]> {
        const searchUsers = 'SELECT * FROM USERS';
        const result = await turso.execute(searchUsers);
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
    
    static async updateDataUser(username: string, updatedData: Partial<UserModel>): Promise<UserModel | null> {
        const { FullName, email, password, avatar, gender } = updatedData;
        const editUser = 'UPDATE users SET Avatar = COALESCE(:NewAvatar, Avatar), FullName = COALESCE(:NewFullNames, FullName), email = COALESCE(:NewEmail, email), password = COALESCE(:NewPassword, password), Gender = COALESCE(:NewGender, Gender) WHERE username = :Username RETURNING *;';
        
        try{
            const updatedUser = await turso.execute({
                sql: editUser,
                args: {
                    NewAvatar : avatar ?? null,
                    NewFullNames: FullName ?? null,
                    NewEmail :email ?? null,
                    NewPassword : password ?? null,
                    NewGender : gender ?? null,
                    Username : username
                },
            });
            if (!updatedUser.rows || updatedUser.rows.length === 0) return null;
            const userUpdated = updatedUser.rows[0];
            return new UserModel(
                String(userUpdated.FullName),
                String(userUpdated.username),
                String(userUpdated.email),
                String(userUpdated.password),
                String(userUpdated.Gender),
                String(userUpdated.UserRole),
                userUpdated.create_At ? new Date() : undefined,
                String(userUpdated.status),
                Number(userUpdated.Id),
                String(userUpdated.Avatar)
            );
        }catch(error){
            console.error('error al actualizar usuario: repository', error);
            throw new Error ('Error al actualizar usuario repository');
        }
    }

    static async deleteByUsername(username: string): Promise<string> {
        const deleteUser = "DELETE FROM USERS WHERE username = :UserName";
        try{
            const result = await turso.execute({
                sql: deleteUser,
                args:{
                    UserName: username
                }
            });
            if (result.rows.length === 0) {
                throw new Error('no existe el usuario');
            }else{
                return `Usuario ${username} eliminado satisfactoriamente`;
            }
        }catch(error){
            console.error('error al eliminar usuario: repository', error);
            throw new Error ('Error al eliminar usuario repository');
        }
    }

    /* static async login(username: string, password: string): Promise<UserModel | null> {
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