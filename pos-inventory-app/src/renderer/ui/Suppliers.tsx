import React, { useEffect, useState } from 'react';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [form, setForm] = useState({ name: '', contact: '', address: '' });
    const [editingId, setEditingId] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        window.api.getSuppliers().then(setSuppliers);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async () => {
        await window.api.addSupplier(form.name, form.contact, form.address);
        setForm({ name: '', contact: '', address: '' });
        setSuppliers(await window.api.getSuppliers());
    };

    const handleEdit = (supplier) => {
        setForm({ name: supplier.name, contact: supplier.contact, address: supplier.address });
        setEditingId(supplier.id);
    };

    const handleUpdate = async () => {
        await window.api.updateSupplier(editingId, form.name, form.contact, form.address);
        setEditingId(null);
        setForm({ name: '', contact: '', address: '' });
        setSuppliers(await window.api.getSuppliers());
    };

    const handleDelete = async (id) => {
        await window.api.deleteSupplier(id);
        setSuppliers(await window.api.getSuppliers());
    };

    const handleViewTransactions = async (id) => {
        setTransactions(await window.api.getSupplierTransactions(id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
            <div className="mb-4 flex gap-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
                <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" className="input" />
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
                <button onClick={editingId ? handleUpdate : handleAdd} className="btn">
                    {editingId ? 'Update Supplier' : 'Add Supplier'}
                </button>
            </div>
            <table className="table-auto w-full mb-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.contact}</td>
                            <td>{supplier.address}</td>
                            <td>
                                <button onClick={() => handleEdit(supplier)} className="btn">Edit</button>
                                <button onClick={() => handleDelete(supplier.id)} className="btn">Delete</button>
                                <button onClick={() => handleViewTransactions(supplier.id)} className="btn">View Transactions</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {transactions.length > 0 && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-2">Supplier Transactions</h2>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Invoice Date</th>
                                <th>Purchase ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t, idx) => (
                                <tr key={idx}>
                                    <td>{t.invoice_date}</td>
                                    <td>{t.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Suppliers;