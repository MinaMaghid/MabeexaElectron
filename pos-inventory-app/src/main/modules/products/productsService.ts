import { openDatabase } from '../../database/sqlite';

export const addProduct = async (name, sku, barcode, price, cost_price, quantity) => {
    const db = await openDatabase();
    await db.run(
        'INSERT INTO inventory (name, sku, barcode, price, cost_price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
        [name, sku, barcode, price, cost_price, quantity]
    );
    await db.close();
};

export const updateProduct = async (id, name, sku, barcode, price, cost_price, quantity) => {
    const db = await openDatabase();
    await db.run(
        'UPDATE inventory SET name = ?, sku = ?, barcode = ?, price = ?, cost_price = ?, quantity = ? WHERE id = ?',
        [name, sku, barcode, price, cost_price, quantity, id]
    );
    await db.close();
};

export const deleteProduct = async (id) => {
    const db = await openDatabase();
    await db.run('DELETE FROM inventory WHERE id = ?', [id]);
    await db.close();
};

export const getProducts = async () => {
    const db = await openDatabase();
    const products = await db.all('SELECT * FROM inventory');
    await db.close();
    return products;
};