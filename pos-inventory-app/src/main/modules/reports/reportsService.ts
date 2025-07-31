import { openDatabase } from '../../database/sqlite';

export const getSalesReport = async (startDate, endDate) => {
    const db = await openDatabase();
    const sales = await db.all(
        `SELECT sales.sale_date, inventory.name AS product_name, sales.quantity, sales.total_price
         FROM sales
         LEFT JOIN inventory ON sales.product_id = inventory.id
         WHERE sales.sale_date >= ? AND sales.sale_date <= ?
         ORDER BY sales.sale_date ASC`,
        [startDate, endDate]
    );
    await db.close();
    return sales;
};

export const getProfitLossReport = async (startDate, endDate) => {
    const db = await openDatabase();
    // Assume cost_price column exists in inventory for profit calculation
    const sales = await db.all(
        `SELECT sales.sale_date, inventory.name AS product_name, sales.quantity, sales.total_price, inventory.cost_price
         FROM sales
         LEFT JOIN inventory ON sales.product_id = inventory.id
         WHERE sales.sale_date >= ? AND sales.sale_date <= ?
         ORDER BY sales.sale_date ASC`,
        [startDate, endDate]
    );
    let profit = 0;
    sales.forEach(s => {
        profit += (s.total_price - (s.quantity * (s.cost_price || 0)));
    });
    await db.close();
    return { sales, profit };
};

export const getStockReport = async () => {
    const db = await openDatabase();
    const stock = await db.all(
        `SELECT name, quantity, price FROM inventory ORDER BY name ASC`
    );
    await db.close();
    return stock;
};

export const getCustomerBalance = async (customerId) => {
    const db = await openDatabase();
    const sales = await db.all(
        `SELECT SUM(total_price) as total FROM sales WHERE customer_id = ?`,
        [customerId]
    );
    await db.close();
    return sales[0]?.total || 0;
};

export const getSupplierBalance = async (supplierId) => {
    const db = await openDatabase();
    const purchases = await db.all(
        `SELECT SUM(price * quantity) as total FROM purchase_items
         LEFT JOIN purchases ON purchase_items.purchase_id = purchases.id
         WHERE purchases.supplier_id = ?`,
        [supplierId]
    );
    await db.close();
    return purchases[0]?.total || 0;
};