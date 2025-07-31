import { openDatabase } from '../../database/sqlite';

export const addBankAccount = async (name, type, balance = 0) => {
    const db = await openDatabase();
    await db.run('INSERT INTO bank_accounts (name, type, balance) VALUES (?, ?, ?)', [name, type, balance]);
    await db.close();
};

export const getBankAccounts = async () => {
    const db = await openDatabase();
    const accounts = await db.all('SELECT * FROM bank_accounts');
    await db.close();
    return accounts;
};

export const addTransaction = async (accountId, amount, reference, date = null, direction = 'in') => {
    const db = await openDatabase();
    await db.run(
        'INSERT INTO bank_transactions (account_id, amount, reference, transaction_date, direction) VALUES (?, ?, ?, ?, ?)',
        [accountId, amount, reference, date || new Date().toISOString(), direction]
    );
    // Update account balance
    await db.run(
        'UPDATE bank_accounts SET balance = balance + ? WHERE id = ?',
        [direction === 'in' ? amount : -amount, accountId]
    );
    await db.close();
};

export const getTransactions = async (accountId) => {
    const db = await openDatabase();
    const transactions = await db.all(
        'SELECT * FROM bank_transactions WHERE account_id = ? ORDER BY transaction_date DESC',
        [accountId]
    );
    await db.close();
    return transactions;
};