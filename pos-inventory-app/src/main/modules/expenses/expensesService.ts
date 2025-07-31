import { openDatabase } from '../../database/sqlite';

export const addExpense = async (amount, category, note, date = null) => {
    const db = await openDatabase();
    await db.run(
        'INSERT INTO expenses (amount, category, note, expense_date) VALUES (?, ?, ?, ?)',
        [amount, category, note, date || new Date().toISOString()]
    );
    await db.close();
};

export const getExpenses = async (filters = {}) => {
    const db = await openDatabase();
    let query = 'SELECT * FROM expenses WHERE 1=1';
    const params = [];
    if (filters.category) {
        query += ' AND category = ?';
        params.push(filters.category);
    }
    if (filters.startDate) {
        query += ' AND expense_date >= ?';
        params.push(filters.startDate);
    }
    if (filters.endDate) {
        query += ' AND expense_date <= ?';
        params.push(filters.endDate);
    }
    query += ' ORDER BY expense_date DESC';
    const expenses = await db.all(query, params);
    await db.close();
    return expenses;
};

export const getTotalExpenses = async () => {
    const db = await openDatabase();
    const total = await db.get('SELECT SUM(amount) as total FROM expenses');
    await db.close();
    return total?.total || 0;
};