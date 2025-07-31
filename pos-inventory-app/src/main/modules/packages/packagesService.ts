import { openDatabase } from '../../database/sqlite';

export const addPackage = async (name, items) => {
    const db = await openDatabase();
    await db.run('INSERT INTO packages (name) VALUES (?)', [name]);
    const packageId = (await db.get('SELECT last_insert_rowid() as id')).id;
    for (const item of items) {
        await db.run('INSERT INTO package_items (package_id, product_id, quantity) VALUES (?, ?, ?)', [packageId, item.productId, item.quantity]);
    }
    await db.close();
    return packageId;
};

export const getPackages = async () => {
    const db = await openDatabase();
    const packages = await db.all('SELECT * FROM packages');
    await db.close();
    return packages;
};

export const getPackageItems = async (packageId) => {
    const db = await openDatabase();
    const items = await db.all(
        `SELECT package_items.*, inventory.name AS product_name
         FROM package_items
         LEFT JOIN inventory ON package_items.product_id = inventory.id
         WHERE package_items.package_id = ?`,
        [packageId]
    );
    await db.close();
    return items;
};