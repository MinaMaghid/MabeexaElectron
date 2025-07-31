import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../database/data.sqlite');
const backupDir = path.join(__dirname, '../../backups');

export const createBackup = async () => {
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
    const backupFile = path.join(backupDir, `backup_${Date.now()}.sqlite`);
    fs.copyFileSync(dbPath, backupFile);
    return backupFile;
};

export const restoreBackup = async (backupFilePath) => {
    fs.copyFileSync(backupFilePath, dbPath);
    return true;
};

export const listBackups = async () => {
    if (!fs.existsSync(backupDir)) return [];
    return fs.readdirSync(backupDir)
        .filter(f => f.endsWith('.sqlite'))
        .map(f => path.join(backupDir, f));
};