import { createBackup } from './backupService';

export const startAutoBackup = () => {
    setInterval(() => {
        createBackup();
    }, 24 * 60 * 60 * 1000); // Every 24 hours
};