import { db } from '../../main/database/sqlite'; // or import { db } from '../../main/database/mysql' for MySQL
import { generateReceipt } from './receiptGenerator'; // Assuming a receipt generator utility exists

export const SalesService = {
    processSale: async (saleData) => {
        try {
            const { items, totalAmount, paymentMethod } = saleData;

            // Insert sale into the database
            const saleId = await db.run('INSERT INTO sales (total_amount, payment_method) VALUES (?, ?)', [totalAmount, paymentMethod]);

            // Insert each item into the sale_items table
            for (const item of items) {
                await db.run('INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [saleId, item.productId, item.quantity, item.price]);
            }

            // Generate and return receipt
            const receipt = generateReceipt(saleId, items, totalAmount, paymentMethod);
            return { success: true, receipt };
        } catch (error) {
            console.error('Error processing sale:', error);
            return { success: false, error: 'Failed to process sale' };
        }
    },

    getSalesReport: async (startDate, endDate) => {
        try {
            const sales = await db.all('SELECT * FROM sales WHERE date BETWEEN ? AND ?', [startDate, endDate]);
            return { success: true, sales };
        } catch (error) {
            console.error('Error fetching sales report:', error);
            return { success: false, error: 'Failed to fetch sales report' };
        }
    }
};