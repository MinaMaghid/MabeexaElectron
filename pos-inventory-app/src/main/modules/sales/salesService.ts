import { openDatabase } from '../../database/sqlite';

export const getSales = async (filters = {}) => {
    const db = await openDatabase();
    let query = `
        SELECT sales.*, inventory.name AS product_name, users.username AS user_name, customers.name AS customer_name
        FROM sales
        LEFT JOIN inventory ON sales.product_id = inventory.id
        LEFT JOIN users ON sales.user_id = users.id
        LEFT JOIN customers ON sales.customer_id = customers.id
        WHERE 1=1
    `;
    const params = [];
    if (filters.customerId) {
        query += ' AND sales.customer_id = ?';
        params.push(filters.customerId);
    }
    if (filters.userId) {
        query += ' AND sales.user_id = ?';
        params.push(filters.userId);
    }
    if (filters.startDate) {
        query += ' AND sales.sale_date >= ?';
        params.push(filters.startDate);
    }
    if (filters.endDate) {
        query += ' AND sales.sale_date <= ?';
        params.push(filters.endDate);
    }
    query += ' ORDER BY sales.sale_date DESC';
    const sales = await db.all(query, params);
    await db.close();
    return sales;
};