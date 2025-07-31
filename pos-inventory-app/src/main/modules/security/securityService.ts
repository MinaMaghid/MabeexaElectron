import os from 'os';
import crypto from 'crypto';
import { openDatabase } from '../../database/sqlite';

function getMachineId() {
    const network = os.networkInterfaces();
    const macs = Object.values(network)
        .flat()
        .filter(Boolean)
        .map(iface => iface.mac)
        .filter(mac => mac && mac !== '00:00:00:00:00:00');
    return crypto.createHash('sha256').update(macs.join('-')).digest('hex');
}

export const validateLicense = async (licenseKey) => {
    const machineId = getMachineId();
    // Simple validation: licenseKey must contain machineId (for demo)
    if (licenseKey && licenseKey.includes(machineId.slice(0, 8))) {
        // Save license to settings
        const db = await openDatabase();
        await db.run(
            'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
            ['licenseKey', licenseKey]
        );
        await db.close();
        return { valid: true, machineId };
    }
    return { valid: false, machineId };
};

export const getLicenseStatus = async () => {
    const db = await openDatabase();
    const row = await db.get('SELECT value FROM settings WHERE key = ?', ['licenseKey']);
    await db.close();
    const machineId = getMachineId();
    if (row && row.value && row.value.includes(machineId.slice(0, 8))) {
        return { valid: true, machineId, licenseKey: row.value };
    }
    return { valid: false, machineId, licenseKey: row?.value || '' };
};