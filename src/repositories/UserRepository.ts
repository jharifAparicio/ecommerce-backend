import { DataBase } from '../config/turso';
import { UserModel } from '../models/UserModel';


export class UserRepository {
    static async createUser(user: UserModel): Promise<UserModel> {
        const defaultAvatar = 'https://res.cloudinary.com/dczydmnqc/image/upload/v1729190833/Ecommers/usuarios/temnrpvpik0zptamtdus.jpg';
        const NewAvatar = user.avatar || defaultAvatar;

        const newUser = 'INSERT INTO Users (Avatar, Nombres, Apellidos ,UserName, email, Password, Gender) VALUES (:avatar, :name , :lastname, :username, :email, :password, :gender) RETURNING *';

        try {
            const result = await DataBase.execute({
                sql: newUser,
                args: {
                    avatar: NewAvatar,
                    name: user.name,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    gender: user.gender
                },
            });

            const createdUser = result.rows[0];
            return new UserModel(
                String(createdUser.Nombres),
                String(createdUser.Apellidos),
                String(createdUser.UserName),
                String(createdUser.email),
                String(createdUser.Password),
                String(createdUser.Gender),
                String(createdUser.UserRole),
                createdUser.CreateAt ? new Date() : undefined,
                String(createdUser.Status_User) ?? '',
                Number(createdUser.Id),
                String(createdUser.Avatar),
            );
        } catch (error) {
            console.error('error al crear usuario: repository', error);
            throw new Error('Error al crear usuario repository');
        }
    }
    static async getUserByUsername(username: string): Promise<UserModel | null> {
        const buscar = "SELECT * FROM USERS WHERE username = :username";
        const result = await DataBase.execute({
            sql: buscar,
            args: { username },
        });

        if (!result.rows || result.rows.length === 0) {
            return new UserModel(
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                undefined,
                "",
                0,
                ""
            );
        } else {
            const getUser = result.rows[0];
            return new UserModel(
                String(getUser.Nombres),
                String(getUser.Apellidos),
                String(getUser.UserName),
                String(getUser.email),
                String(getUser.Password),
                String(getUser.Gender),
                String(getUser.UserRole),
                getUser.createAt ? new Date() : undefined,
                String(getUser.Status_User) ?? '',
                Number(getUser.Id),
                String(getUser.Avatar),
            );
        }
    }

    static async getAllUsers(): Promise<UserModel[]> {
        const searchUsers = 'SELECT * FROM USERS';
        const result = await DataBase.execute(searchUsers);
        if (!result.rows || result.rows.length === 0) return [];
        return result.rows.map((row => new UserModel(
            row.Nombres ? String(row.Nombres) : "",
            row.Apellidos ? String(row.Apellidos) : "",
            row.UserName ? String(row.UserName) : "",
            row.email ? String(row.email) : "",
            row.Password ? String(row.Password) : "",
            row.Gender ? String(row.Gender) : "",
            row.UserRole ? String(row.UserRole) : "",
            row.create_at ? new Date(String(row.create_at)) : undefined,
            row.Status_User ? String(row.Status_User) : "",
            row.Id ? parseInt(String(row.Id)) : 0,
            row.Avatar ? String(row.Avatar) : "Avatar no disponible"
        )));
    }

    static async updateDataUser(username: string, updatedData: Partial<UserModel>): Promise<UserModel | null> {
        const { name,lastname, email, password, avatar, gender } = updatedData;
        const editUser = 'UPDATE USERS SET Avatar = COALESCE(:NewAvatar, Avatar), Nombres = COALESCE(:nombres, Nombres), Apellidos = COALESCE(:apellidos, Apellidos), email = COALESCE(:NewEmail, email), Password = COALESCE(:NewPassword, Password), Gender = COALESCE(:NewGender, Gender) WHERE UserName = :Username RETURNING *;';

        try {
            const updatedUser = await DataBase.execute({
                sql: editUser,
                args: {
                    NewAvatar: avatar ?? null,
                    nombres: name ?? null,
                    apellidos: lastname ?? null,
                    NewEmail: email ?? null,
                    NewPassword: password ?? null,
                    NewGender: gender ?? null,
                    Username: username
                },
            });
            if (!updatedUser.rows || updatedUser.rows.length === 0) return null;
            const userUpdated = updatedUser.rows[0];
            return new UserModel(
                String(userUpdated.Nombres),
                String(userUpdated.Apellidos),
                String(userUpdated.UserName),
                String(userUpdated.email),
                String(userUpdated.Password),
                String(userUpdated.Gender),
                String(userUpdated.UserRole),
                userUpdated.create_At ? new Date() : undefined,
                String(userUpdated.Status_User) ?? 'active',
                Number(userUpdated.Id),
                String(userUpdated.Avatar)
            );
        } catch (error) {
            console.error('error al actualizar usuario: repository', error);
            throw new Error('Error al actualizar usuario repository');
        }
    }

    static async deleteByUsername(username: string): Promise<string> {
        const deleteUser = "DELETE FROM USERS WHERE username = :UserName";
        try {
            const result = await DataBase.execute({
                sql: deleteUser,
                args: {
                    UserName: username
                }
            });
            if (result.rows.length === 0) {
                throw new Error('no existe el usuario');
            } else {
                return `Usuario ${username} eliminado satisfactoriamente`;
            }
        } catch (error) {
            console.error('error al eliminar usuario: repository', error);
            throw new Error('Error al eliminar usuario repository');
        }
    }
}