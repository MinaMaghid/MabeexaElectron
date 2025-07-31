import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('your-secure-password', 'salt', 32);
const iv = Buffer.alloc(16, 0);

export const encrypt = (data: string): string => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

export const decrypt = (encrypted: string): string => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};