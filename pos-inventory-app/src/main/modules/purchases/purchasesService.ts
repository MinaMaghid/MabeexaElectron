import { openDatabase } from '../../database/sqlite';

export const addPurchase = async (supplierId, products, invoiceDate) => {
    const db = await openDatabase();
    // Insert purchase record
    await db.run(
        'INSERT INTO purchases (supplier_id, invoice_date) VALUES (?, ?)',
        [supplierId, invoiceDate || new Date().toISOString()]
    );
    const purchaseId = (await db.get('SELECT last_insert_rowid() as id')).id;
    // Insert products and update inventory
    for (const item of products) {
        await db.run(
            'INSERT INTO purchase_items (purchase_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [purchaseId, item.productId, item.quantity, item.price]
        );
        await db.run(
            'UPDATE inventory SET quantity = quantity + ? WHERE id = ?',
            [item.quantity, item.productId]
        );
    }
    await db.close();
    return { success: true, purchaseId };
};

export const getPurchases = async () => {
    const db = await openDatabase();
    const purchases = await db.all(`
        SELECT purchases.*, suppliers.name AS supplier_name
        FROM purchases
        LEFT JOIN suppliers ON purchases.supplier_id = suppliers.id
        ORDER BY purchases.invoice_date DESC
    `);
    await db.close();
    return purchases;
};

export const getSuppliers = async () => {
    const db = await openDatabase();
    const suppliers = await db.all('SELECT id, name FROM suppliers');
    await db.close();
    return suppliers;
};

export const getProducts = async () => {
    const db = await openDatabase();
    const products = await db.all('SELECT id, name, price FROM inventory');
    await db.close();
    return products;
};