import { openDatabase } from '../../database/sqlite';

export const getSettings = async () => {
    const db = await openDatabase();
    const settings = await db.all('SELECT key, value FROM settings');
    await db.close();
    // Convert array to object
    return Object.fromEntries(settings.map(s => [s.key, s.value]));
};

export const setSetting = async (key, value) => {
    const db = await openDatabase();
    await db.run(
        'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
        [key, value]
    );
    await db.close();
};