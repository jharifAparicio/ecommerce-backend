CREATE TABLE
  Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Avatar TEXT NOT NULL,
    Nombres TEXT NOT NULL,
    Apellidos TEXT NOT NULL,
    UserName TEXT NOT NULL UNIQUE,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    UserRole TEXT CHECK (UserRole IN ('admin', 'user')) NOT NULL DEFAULT 'user',
    CreatedAt TEXT DEFAULT (DATETIME('now')),
    Status_User TEXT NOT NULL CHECK (Status_User IN ('active', 'inactive')) DEFAULT 'active',
    Gender TEXT NOT NULL CHECK (Gender IN ('HOMBRE', 'MUJER'))
  );

CREATE TABLE
  Authors (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL
  );

CREATE TABLE
  Categories (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL
  );

CREATE TABLE
  Books (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Author TEXT NOT NULL,
    Description TEXT NOT NULL,
    ISBN TEXT NOT NULL UNIQUE,
    Category TEXT NOT NULL,
    /* foreign key */
    Publication_date TEXT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INTEGER NOT NULL,
    Publisher TEXT NOT NULL,
    Format TEXT NOT NULL,
    /* tapa blanda, tapa dura */
    Image_url TEXT NOT NULL,
    Language TEXT NOT NULL,
    Author_id INTEGER NOT NULL,
    /* foreign key */
    Category_id INTEGER NOT NULL,
    /* foreign key */
    FOREIGN KEY (Author_id) REFERENCES Authors (Id),
    FOREIGN KEY (Category_id) REFERENCES Categories (Id)
  );

CREATE TABLE
  Orders (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    User_id INTEGER NOT NULL,
    /* foreign key */
    Order_date TEXT NOT NULL,
    Status TEXT NOT NULL CHECK (Status IN ('pending', 'completed', 'cancelled')),
    Total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users (Id)
  );

CREATE TABLE
  Order_items (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Order_id INTEGER NOT NULL,
    /* foreign key */
    Book_id INTEGER NOT NULL,
    /* foreign key */
    Quantity INTEGER NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (Order_id) REFERENCES orders (Id),
    FOREIGN KEY (Book_id) REFERENCES Books (Id)
  );

CREATE TABLE
  Reviews (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Book_id INTEGER NOT NULL,
    /* foreign key */
    User_id INTEGER NOT NULL,
    /* foreign key */
    Rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    Comment TEXT,
    Review_date TEXT NOT NULL,
    FOREIGN KEY (Book_id) REFERENCES Books (Id),
    FOREIGN KEY (User_id) REFERENCES Users (Id)
  );

CREATE TABLE
  cart (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    User_id INTEGER NOT NULL,
    /* foreign key */
    Book_id INTEGER NOT NULL,
    /* foreign key */
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (User_id) REFERENCES Users (Id),
    FOREIGN KEY (Book_id) REFERENCES Books (Id)
  );