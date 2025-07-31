import React, { useEffect, useState } from 'react';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: '', contact: '', address: '' });
    const [editingId, setEditingId] = useState(null);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        window.api.getCustomers().then(setCustomers);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async () => {
        await window.api.addCustomer(form.name, form.contact, form.address);
        setForm({ name: '', contact: '', address: '' });
        setCustomers(await window.api.getCustomers());
    };

    const handleEdit = (customer) => {
        setForm({ name: customer.name, contact: customer.contact, address: customer.address });
        setEditingId(customer.id);
    };

    const handleUpdate = async () => {
        await window.api.updateCustomer(editingId, form.name, form.contact, form.address);
        setEditingId(null);
        setForm({ name: '', contact: '', address: '' });
        setCustomers(await window.api.getCustomers());
    };

    const handleDelete = async (id) => {
        await window.api.deleteCustomer(id);
        setCustomers(await window.api.getCustomers());
    };

    const handleViewPurchases = async (id) => {
        setPurchases(await window.api.getCustomerPurchases(id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <div className="mb-4 flex gap-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
                <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" className="input" />
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
                <button onClick={editingId ? handleUpdate : handleAdd} className="btn">
                    {editingId ? 'Update Customer' : 'Add Customer'}
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
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.contact}</td>
                            <td>{customer.address}</td>
                            <td>
                                <button onClick={() => handleEdit(customer)} className="btn">Edit</button>
                                <button onClick={() => handleDelete(customer.id)} className="btn">Delete</button>
                                <button onClick={() => handleViewPurchases(customer.id)} className="btn">View Purchases</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {purchases.length > 0 && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-2">Purchase History</h2>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((p, idx) => (
                                <tr key={idx}>
                                    <td>{p.sale_date}</td>
                                    <td>{p.product_name}</td>
                                    <td>{p.quantity}</td>
                                    <td>{p.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Customers;