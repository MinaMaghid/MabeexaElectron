import { openDatabase } from '../database/sqlite';

export const getLowStockProducts = async (threshold = 5) => {
    const db = await openDatabase();
    const products = await db.all('SELECT * FROM inventory WHERE quantity <= ?', [threshold]);
    await db.close();
    return products;
};

// Add more inventory-related functions as needed