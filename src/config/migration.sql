CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    UserName TEXT NOT NULL UNIQUE,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    Role TEXT CHECK (Role IN ('admin', 'user')) DEFAULT 'user'
);

CREATE TABLE Books (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Author TEXT NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INTEGER NOT NULL,
    ImageUrl TEXT
);

CREATE TABLE Orders (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    OrderDate TEXT DEFAULT (DATETIME('now')),
    Status TEXT CHECK (Status IN ('pending', 'completed', 'cancelled')) DEFAULT 'pending',
    TotalAmount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Cart (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    BookId INTEGER NOT NULL,
    Quantity INTEGER NOT NULL
);