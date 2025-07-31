import { openDatabase } from '../../database/sqlite';

export const getDashboardStats = async () => {
    const db = await openDatabase();
    const totalSales = await db.get('SELECT SUM(total_price) as total FROM sales');
    const totalProducts = await db.get('SELECT COUNT(*) as count FROM inventory');
    const lowStock = await db.all('SELECT name, quantity FROM inventory WHERE quantity <= 5');
    const todaySales = await db.get('SELECT SUM(total_price) as total FROM sales WHERE sale_date >= date("now")');
    // Sales per day for last 7 days
    const salesChart = await db.all(`
        SELECT date(sale_date) as date, SUM(total_price) as total
        FROM sales
        WHERE sale_date >= date('now', '-6 days')
        GROUP BY date(sale_date)
        ORDER BY date(sale_date)
    `);
    await db.close();
    return {
        totalSales: totalSales?.total || 0,
        totalProducts: totalProducts?.count || 0,
        lowStock,
        todaySales: todaySales?.total || 0,
        salesChart,
    };
};