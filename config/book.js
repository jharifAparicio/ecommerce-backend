const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// configure connection to database
const dbPath = path.resolve(__dirname, '../db/books.db');
const bookDB = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite de libros.');
    }
});

bookDB.serialize(() => {
    bookDB.run(`
        CREATE TABLE IF NOT EXISTS books (
            id TEXT PRIMARY KEY,
            title TEXT,
            author TEXT,
            first_publish_year INT,
            cover_image TEXT,
            stock INT
    )`);
})

module.exports = bookDB;