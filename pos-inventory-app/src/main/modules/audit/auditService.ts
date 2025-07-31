import { openDatabase } from '../../database/sqlite';

export const logAction = async (user, action, details) => {
    const db = await openDatabase();
    await db.run(
        'INSERT INTO audit_log (date, user, action, details) VALUES (?, ?, ?, ?)',
        [new Date().toISOString(), user, action, details]
    );
    await db.close();
};

export const getAuditLogs = async () => {
    const db = await openDatabase();
    const logs = await db.all('SELECT * FROM audit_log ORDER BY date DESC');
    await db.close();
    return logs;
};