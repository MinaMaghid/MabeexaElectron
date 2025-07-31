import { User } from '../../types'; // Assuming User type is defined in types/index.ts
import { db } from '../main/database/sqlite'; // Adjust import based on your database choice

export const createUser = async (user: User): Promise<void> => {
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    await db.run(query, [user.username, user.password, user.role]);
};

export const getUserById = async (id: number): Promise<User | null> => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const user = await db.get(query, [id]);
    return user || null;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<void> => {
    const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
    await db.run(query, [user.username, user.password, user.role, id]);
};

export const deleteUser = async (id: number): Promise<void> => {
    const query = 'DELETE FROM users WHERE id = ?';
    await db.run(query, [id]);
};

export const getAllUsers = async (): Promise<User[]> => {
    const query = 'SELECT * FROM users';
    const users = await db.all(query);
    return users;
};