import { openDatabase } from '../../database/sqlite';
import bcrypt from 'bcrypt';

export const addUser = async (username: string, password: string, role: string) => {
    const db = await openDatabase();
    const hash = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hash, role]);
    await db.close();
};

export const getUserByUsername = async (username: string) => {
    const db = await openDatabase();
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    await db.close();
    return user;
};

export const getUsers = async () => {
    const db = await openDatabase();
    const users = await db.all('SELECT id, username, role FROM users');
    await db.close();
    return users;
};

export const deleteUser = async (id: number) => {
    const db = await openDatabase();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    await db.close();
};

export const updateUserRole = async (id: number, role: string) => {
    const db = await openDatabase();
    await db.run('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    await db.close();
};

export const verifyPassword = async (username: string, password: string) => {
    const db = await openDatabase();
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    await db.close();
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
};