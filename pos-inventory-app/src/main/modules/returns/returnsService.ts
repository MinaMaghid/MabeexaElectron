import { openDatabase } from '../../database/sqlite';

export const getReturns = async () => {
    const db = await openDatabase();
    const returns = await db.all(`
        SELECT returns.*, inventory.name AS product_name, customers.name AS customer_name
        FROM returns
        LEFT JOIN inventory ON returns.product_id = inventory.id
        LEFT JOIN customers ON returns.customer_id = customers.id
        ORDER BY returns.return_date DESC
    `);
    await db.close();
    return returns;
};

export const processReturn = async (saleId, productId, quantity, reason) => {
    const db = await openDatabase();
    // Get sale info for linking
    const sale = await db.get('SELECT * FROM sales WHERE id = ?', [saleId]);
    if (!sale) throw new Error('Sale not found');
    // Insert return record
    await db.run(
        'INSERT INTO returns (sale_id, product_id, customer_id, quantity, reason, return_date) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [saleId, productId, sale.customer_id, quantity, reason]
    );
    // Restock inventory
    await db.run('UPDATE inventory SET quantity = quantity + ? WHERE id = ?', [quantity, productId]);
    await db.close();
    return { success: true };
};