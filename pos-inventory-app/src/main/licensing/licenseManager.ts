import fs from 'fs';
import path from 'path';
import os from 'os';
import { encrypt, decrypt } from '../security/encryption';

const getHardwareId = () => {
    return os.hostname() + '-' + (os.networkInterfaces()['eth0']?.[0]?.mac || 'unknown');
};

export const generateLicense = (durationDays: number, isTrial: boolean): string => {
    const expiry = Date.now() + durationDays * 24 * 60 * 60 * 1000;
    const payload = JSON.stringify({
        hwid: getHardwareId(),
        expiry,
        trial: isTrial
    });
    return encrypt(payload);
};

export const validateLicense = (license: string): boolean => {
    try {
        const payload = JSON.parse(decrypt(license));
        if (payload.hwid !== getHardwareId()) return false;
        if (Date.now() > payload.expiry) return false;
        return true;
    } catch {
        return false;
    }
};