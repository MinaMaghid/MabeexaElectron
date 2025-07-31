import { openDatabase } from '../../database/sqlite';

export const addSupplier = async (name, contact, address) => {
    const db = await openDatabase();
    await db.run('INSERT INTO suppliers (name, contact, address) VALUES (?, ?, ?)', [name, contact, address]);
    await db.close();
};

export const updateSupplier = async (id, name, contact, address) => {
    const db = await openDatabase();
    await db.run('UPDATE suppliers SET name = ?, contact = ?, address = ? WHERE id = ?', [name, contact, address, id]);
    await db.close();
};

export const deleteSupplier = async (id) => {
    const db = await openDatabase();
    await db.run('DELETE FROM suppliers WHERE id = ?', [id]);
    await db.close();
};

export const getSuppliers = async () => {
    const db = await openDatabase();
    const suppliers = await db.all('SELECT * FROM suppliers');
    await db.close();
    return suppliers;
};

export const getSupplierTransactions = async (supplierId) => {
    const db = await openDatabase();
    const purchases = await db.all(
        'SELECT * FROM purchases WHERE supplier_id = ? ORDER BY invoice_date DESC',
        [supplierId]
    );
    await db.close();
    return purchases;
};