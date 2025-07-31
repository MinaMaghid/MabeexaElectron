import { openDatabase } from '../../database/sqlite';

export const addDamagedItem = async (productId, quantity, note, date = null) => {
    const db = await openDatabase();
    await db.run(
        'INSERT INTO damaged_items (product_id, quantity, note, damaged_date) VALUES (?, ?, ?, ?)',
        [productId, quantity, note, date || new Date().toISOString()]
    );
    await db.run(
        'UPDATE inventory SET quantity = quantity - ? WHERE id = ?',
        [quantity, productId]
    );
    await db.close();
};

export const getDamagedItems = async () => {
    const db = await openDatabase();
    const items = await db.all(`
        SELECT damaged_items.*, inventory.name AS product_name
        FROM damaged_items
        LEFT JOIN inventory ON damaged_items.product_id = inventory.id
        ORDER BY damaged_items.damaged_date DESC
    `);
    await db.close();
    return items;
};