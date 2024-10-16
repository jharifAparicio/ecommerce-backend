const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// configure connection to database
const dbPath = path.resolve(__dirname, "../db/users.db");
const UserDB = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error al conectar con la base de datos", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite de usuarios.");
    }
});

UserDB.serialize(() => {
    UserDB.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        names TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATE DEFAULT (datetime('now'))
    )`);
});

module.exports = UserDB;