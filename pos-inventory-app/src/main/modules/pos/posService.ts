import { openDatabase } from '../../database/sqlite';

export const getProductsForPOS = async () => {
    const db = await openDatabase();
    const products = await db.all('SELECT id, name, sku, barcode, price, quantity FROM inventory WHERE quantity > 0');
    await db.close();
    return products;
};

export const getCustomers = async () => {
    const db = await openDatabase();
    const customers = await db.all('SELECT id, name FROM customers');
    await db.close();
    return customers;
};

export const addSale = async (items, customerId, discount, paymentMethod) => {
    const db = await openDatabase();
    let totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPrice -= discount || 0;
    for (const item of items) {
        await db.run(
            'INSERT INTO sales (product_id, quantity, total_price, sale_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
            [item.id, item.quantity, item.price * item.quantity]
        );
        await db.run(
            'UPDATE inventory SET quantity = quantity - ? WHERE id = ?',
            [item.quantity, item.id]
        );
    }
    // Optionally link sale to customer and payment method
    await db.close();
    return { success: true, totalPrice };
};