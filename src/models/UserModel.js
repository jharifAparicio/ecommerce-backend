class UserModel {
    constructor(id,names,username,email,password){
        this.id = id;
        this.names = names;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

module.exports = UserModel;