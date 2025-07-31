import { openDatabase } from '../../database/sqlite';

export const addCustomer = async (name, contact, address) => {
    const db = await openDatabase();
    await db.run('INSERT INTO customers (name, contact, address) VALUES (?, ?, ?)', [name, contact, address]);
    await db.close();
};

export const updateCustomer = async (id, name, contact, address) => {
    const db = await openDatabase();
    await db.run('UPDATE customers SET name = ?, contact = ?, address = ? WHERE id = ?', [name, contact, address, id]);
    await db.close();
};

export const deleteCustomer = async (id) => {
    const db = await openDatabase();
    await db.run('DELETE FROM customers WHERE id = ?', [id]);
    await db.close();
};

export const getCustomers = async () => {
    const db = await openDatabase();
    const customers = await db.all('SELECT * FROM customers');
    await db.close();
    return customers;
};

export const getCustomerPurchases = async (customerId) => {
    const db = await openDatabase();
    const purchases = await db.all(
        `SELECT sales.*, inventory.name AS product_name
         FROM sales
         LEFT JOIN inventory ON sales.product_id = inventory.id
         WHERE sales.customer_id = ?
         ORDER BY sales.sale_date DESC`,
        [customerId]
    );
    await db.close();
    return purchases;
};