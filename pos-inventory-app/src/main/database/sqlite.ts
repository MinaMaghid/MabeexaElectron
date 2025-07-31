import { Database } from 'sqlite3';
import { open } from 'sqlite';

const dbFile = './database/pos_inventory.db';

export const openDatabase = async () => {
    return open({
        filename: dbFile,
        driver: Database
    });
};

export const createTables = async (db) => {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            sku TEXT,
            barcode TEXT,
            price REAL NOT NULL,
            cost_price REAL,
            quantity INTEGER NOT NULL DEFAULT 0
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            total_price REAL NOT NULL,
            sale_date TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES inventory (id)
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS returns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sale_id INTEGER,
            product_id INTEGER,
            customer_id INTEGER,
            quantity INTEGER NOT NULL,
            reason TEXT,
            return_date TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sale_id) REFERENCES sales(id),
            FOREIGN KEY (product_id) REFERENCES inventory(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id)
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            note TEXT,
            expense_date TEXT DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS purchases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplier_id INTEGER,
            invoice_date TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS purchase_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            purchase_id INTEGER,
            product_id INTEGER,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (purchase_id) REFERENCES purchases(id),
            FOREIGN KEY (product_id) REFERENCES inventory(id)
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            contact TEXT,
            address TEXT
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            contact TEXT,
            address TEXT
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS damaged_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            quantity INTEGER NOT NULL,
            note TEXT,
            damaged_date TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES inventory(id)
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS bank_accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL, -- Bank or e-Wallet
            balance REAL DEFAULT 0
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS bank_transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            account_id INTEGER,
            amount REAL NOT NULL,
            reference TEXT,
            transaction_date TEXT DEFAULT CURRENT_TIMESTAMP,
            direction TEXT NOT NULL, -- in/out
            FOREIGN KEY (account_id) REFERENCES bank_accounts(id)
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        );
    `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS packages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS package_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            package_id INTEGER,
            product_id INTEGER,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (package_id) REFERENCES packages(id),
            FOREIGN KEY (product_id) REFERENCES inventory(id)
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            user TEXT,
            action TEXT,
            details TEXT
        );
    `);
};

export const addProduct = async (name, quantity, price) => {
    const db = await openDatabase();
    await db.run('INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)', [name, quantity, price]);
    await db.close();
};

export const updateProduct = async (id, name, quantity, price) => {
    const db = await openDatabase();
    await db.run('UPDATE inventory SET name = ?, quantity = ?, price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, quantity, price, id]);
    await db.close();
};

export const deleteProduct = async (id) => {
    const db = await openDatabase();
    await db.run('DELETE FROM inventory WHERE id = ?', [id]);
    await db.close();
};

export const getInventory = async () => {
    const db = await openDatabase();
    const inventory = await db.all('SELECT * FROM inventory');
    await db.close();
    return inventory;
};

export const recordSale = async (productId, quantity, totalPrice) => {
    const db = await openDatabase();
    await db.run('INSERT INTO sales (product_id, quantity, total_price) VALUES (?, ?, ?)', [productId, quantity, totalPrice]);
    await db.close();
};

export const getSales = async () => {
    const db = await openDatabase();
    const sales = await db.all('SELECT * FROM sales');
    await db.close();
    return sales;
};