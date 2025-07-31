import fs from 'fs';
import { openDatabase } from '../../database/sqlite';

export const exportInventoryCSV = async (filePath) => {
    const db = await openDatabase();
    const products = await db.all('SELECT * FROM inventory');
    await db.close();
    const csv = ['id,name,sku,barcode,price,cost_price,quantity']
        .concat(products.map(p => `${p.id},"${p.name}","${p.sku}","${p.barcode}",${p.price},${p.cost_price},${p.quantity}`))
        .join('\n');
    fs.writeFileSync(filePath, csv);
    return true;
};

export const importInventoryCSV = async (filePath) => {
    const db = await openDatabase();
    const data = fs.readFileSync(filePath, 'utf8').split('\n').slice(1);
    for (const line of data) {
        const [id, name, sku, barcode, price, cost_price, quantity] = line.split(',');
        await db.run(
            'INSERT OR REPLACE INTO inventory (id, name, sku, barcode, price, cost_price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, name.replace(/"/g,''), sku.replace(/"/g,''), barcode.replace(/"/g,''), price, cost_price, quantity]
        );
    }
    await db.close();
    return true;
};