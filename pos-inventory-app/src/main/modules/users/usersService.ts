import { openDatabase } from '../../database/sqlite';
import crypto from 'crypto';

export const addUser = async (username, password, role) => {
    const db = await openDatabase();
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hash, role]);
    await db.close();
};

export const updateUser = async (id, username, role) => {
    const db = await openDatabase();
    await db.run('UPDATE users SET username = ?, role = ? WHERE id = ?', [username, role, id]);
    await db.close();
};

export const deleteUser = async (id) => {
    const db = await openDatabase();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    await db.close();
};

export const getUsers = async () => {
    const db = await openDatabase();
    const users = await db.all('SELECT id, username, role FROM users');
    await db.close();
    return users;
};

export const login = async (username, password) => {
    const db = await openDatabase();
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const user = await db.get('SELECT id, username, role FROM users WHERE username = ? AND password = ?', [username, hash]);
    await db.close();
    return user;
};