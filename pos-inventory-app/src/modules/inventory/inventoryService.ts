import { Database } from 'sqlite3';
import { open } from 'sqlite';

const dbFilePath = './database/inventory.db'; // Adjust the path as necessary

export const openDatabase = async () => {
    return open({
        filename: dbFilePath,
        driver: Database
    });
};

export const addProduct = async (product) => {
    const db = await openDatabase();
    const { name, category, price, quantity } = product;
    await db.run('INSERT INTO products (name, category, price, quantity) VALUES (?, ?, ?, ?)', [name, category, price, quantity]);
    await db.close();
};

export const updateProduct = async (productId, updatedProduct) => {
    const db = await openDatabase();
    const { name, category, price, quantity } = updatedProduct;
    await db.run('UPDATE products SET name = ?, category = ?, price = ?, quantity = ? WHERE id = ?', [name, category, price, quantity, productId]);
    await db.close();
};

export const deleteProduct = async (productId) => {
    const db = await openDatabase();
    await db.run('DELETE FROM products WHERE id = ?', [productId]);
    await db.close();
};

export const getProducts = async () => {
    const db = await openDatabase();
    const products = await db.all('SELECT * FROM products');
    await db.close();
    return products;
};