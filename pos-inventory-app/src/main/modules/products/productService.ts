import { openDatabase } from '../../database/sqlite';
import { v4 as uuidv4 } from 'uuid';

export const addCategory = async (name: string) => {
    const db = await openDatabase();
    await db.run('INSERT INTO categories (name) VALUES (?)', [name]);
    await db.close();
};

export const getCategories = async () => {
    const db = await openDatabase();
    const categories = await db.all('SELECT * FROM categories');
    await db.close();
    return categories;
};

export const addProduct = async (name: string, sku: string, barcode: string, categoryId: number, price: number, quantity: number) => {
    const db = await openDatabase();
    await db.run(
        'INSERT INTO inventory (name, sku, barcode, category_id, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
        [name, sku, barcode, categoryId, price, quantity]
    );
    await db.close();
};

export const updateProduct = async (id: number, name: string, sku: string, barcode: string, categoryId: number, price: number, quantity: number) => {
    const db = await openDatabase();
    await db.run(
        'UPDATE inventory SET name = ?, sku = ?, barcode = ?, category_id = ?, price = ?, quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, sku, barcode, categoryId, price, quantity, id]
    );
    await db.close();
};

export const deleteProduct = async (id: number) => {
    const db = await openDatabase();
    await db.run('DELETE FROM inventory WHERE id = ?', [id]);
    await db.close();
};

export const getProducts = async () => {
    const db = await openDatabase();
    const products = await db.all(`
        SELECT inventory.*, categories.name AS category_name
        FROM inventory
        LEFT JOIN categories ON inventory.category_id = categories.id
    `);
    await db.close();
    return products;
};

export const generateBarcode = (): string => {
    return uuidv4();
};