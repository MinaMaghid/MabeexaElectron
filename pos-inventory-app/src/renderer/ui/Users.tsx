import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: '', password: '', role: 'cashier' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        window.api.getUsers().then(setUsers);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async () => {
        if (!form.username || !form.password) return;
        await window.api.addUser(form.username, form.password, form.role);
        setForm({ username: '', password: '', role: 'cashier' });
        setUsers(await window.api.getUsers());
    };

    const handleEdit = (user) => {
        setForm({ username: user.username, password: '', role: user.role });
        setEditingId(user.id);
    };

    const handleUpdate = async () => {
        await window.api.updateUser(editingId, form.username, form.role);
        setEditingId(null);
        setForm({ username: '', password: '', role: 'cashier' });
        setUsers(await window.api.getUsers());
    };

    const handleDelete = async (id) => {
        await window.api.deleteUser(id);
        setUsers(await window.api.getUsers());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="mb-4 flex gap-2">
                <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="input" />
                <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="input" />
                <select name="role" value={form.role} onChange={handleChange} className="input">
                    <option value="admin">Admin</option>
                    <option value="cashier">Cashier</option>
                </select>
                <button onClick={editingId ? handleUpdate : handleAdd} className="btn">
                    {editingId ? 'Update' : 'Add'}
                </button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEdit(user)} className="btn">Edit</button>
                                <button onClick={() => handleDelete(user.id)} className="btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;