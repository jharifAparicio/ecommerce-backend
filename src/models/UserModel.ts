export class UserModel{
    id?: number;
    avatar?: string;
    FullName: string;
    username: string;
    email: string;
    password: string;
    UserRole?: string;
    createdAt?: Date;
    status?: string;
    gender: string;
    constructor (
        FullName: string, 
        username: string, 
        email: string, 
        password: string,
        gender: string,
        UserRole?: string, 
        createdAt?: Date, 
        status?: string,
        id?: number, 
        avatar?: string, 
    ){
        this.id = id;
        this.avatar = avatar;
        this.FullName = FullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.UserRole = UserRole;
        this.createdAt = createdAt;
        this.status = status;
        this.gender = gender;
    }
}