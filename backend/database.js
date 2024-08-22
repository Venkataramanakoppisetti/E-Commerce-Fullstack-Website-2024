const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./e-commerce.db");

db.serialize(() => {
    console.log("Creating Tables");

    // Users Table
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'customer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (error) => {
        if (error) {
            console.log("Error while creating Users table", error.message);
        } else {
            console.log("Users table is created...!!!");
        }
    });

    // Products Table
    db.run(`CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        stock_quantity INTEGER DEFAULT 0,
        category_id INTEGER,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES Categories(id)
    )`, (error) => {
        if (error) {
            console.log("Error while creating Products table", error.message);
        } else {
            console.log("Products table is created...!!!");
        }
    });

    // Categories Table
    db.run(`CREATE TABLE IF NOT EXISTS Categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (error) => {
        if (error) {
            console.log("Error while creating Categories table", error.message);
        } else {
            console.log("Categories table is created...!!!");
        }
    });

    // Orders Table
    db.run(`CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        payment_id INTEGER,
        shipping_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (payment_id) REFERENCES Payments(id),
        FOREIGN KEY (shipping_id) REFERENCES ShippingDetails(id)
    )`, (error) => {
        if (error) {
            console.log("Error while creating Orders table", error.message);
        } else {
            console.log("Orders table is created...!!!");
        }
    });

    // OrderItems Table
    db.run(`CREATE TABLE IF NOT EXISTS OrderItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES Orders(id),
        FOREIGN KEY (product_id) REFERENCES Products(id)
    )`, (error) => {
        if (error) {
            console.log("Error while creating OrderItems table", error.message);
        } else {
            console.log("OrderItems table is created...!!!");
        }
    });

    // Cart Table
    db.run(`CREATE TABLE IF NOT EXISTS Cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id)
    )`, (error) => {
        if (error) {
            console.log("Error while creating Cart table", error.message);
        } else {
            console.log("Cart table is created...!!!");
        }
    });

    // CartItems Table
    db.run(`CREATE TABLE IF NOT EXISTS CartItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cart_id) REFERENCES Cart(id),
        FOREIGN KEY (product_id) REFERENCES Products(id)
    )`, (error) => {
        if (error) {
            console.log("Error while creating CartItems table", error.message);
        } else {
            console.log("CartItems table is created...!!!");
        }
    });

    // Payments Table
    db.run(`CREATE TABLE IF NOT EXISTS Payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        amount REAL NOT NULL,
        payment_method TEXT NOT NULL,
        payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES Orders(id)
    )`, (error) => {
        if (error) {
            console.log("Error while creating Payments table", error.message);
        } else {
            console.log("Payments table is created...!!!");
        }
    });

    // ShippingDetails Table
    db.run(`CREATE TABLE IF NOT EXISTS ShippingDetails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip_code TEXT NOT NULL,
        country TEXT NOT NULL,
        shipping_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        delivery_date DATETIME,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES Orders(id)
    )`, (error) => {
        if (error) {
            console.log("Error while creating ShippingDetails table", error.message);
        } else {
            console.log("ShippingDetails table is created...!!!");
        }
    });

});

module.exports = db;
