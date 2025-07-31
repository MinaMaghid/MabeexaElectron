import React, { useEffect, useState } from 'react';

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ supplierId: '', invoiceDate: '', items: [] });
    const [item, setItem] = useState({ productId: '', quantity: 1, price: '' });

    useEffect(() => {
        window.api.getPurchases().then(setPurchases);
        window.api.getSuppliers().then(setSuppliers);
        window.api.getProducts().then(setProducts);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleItemChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { ...item, quantity: Number(item.quantity), price: Number(item.price) }] });
        setItem({ productId: '', quantity: 1, price: '' });
    };

    const handleAddPurchase = async () => {
        await window.api.addPurchase(form.supplierId, form.items, form.invoiceDate);
        setForm({ supplierId: '', invoiceDate: '', items: [] });
        setPurchases(await window.api.getPurchases());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Purchases</h1>
            <div className="mb-4 flex gap-2">
                <select name="supplierId" value={form.supplierId} onChange={handleChange} className="input">
                    <option value="">Select Supplier</option>
                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input name="invoiceDate" value={form.invoiceDate} onChange={handleChange} type="date" className="input" />
            </div>
            <div className="mb-4 flex gap-2">
                <select name="productId" value={item.productId} onChange={handleItemChange} className="input">
                    <option value="">Select Product</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input name="quantity" value={item.quantity} onChange={handleItemChange} type="number" min="1" className="input" />
                <input name="price" value={item.price} onChange={handleItemChange} type="number" min="0" className="input" placeholder="Price" />
                <button onClick={addItem} className="btn">Add Item</button>
            </div>
            <div className="mb-4">
                <h2 className="font-semibold mb-2">Invoice Items</h2>
                <ul>
                    {form.items.map((it, idx) => (
                        <li key={idx}>{products.find(p => p.id === Number(it.productId))?.name || ''} x{it.quantity} @ {it.price}</li>
                    ))}
                </ul>
            </div>
            <button onClick={handleAddPurchase} className="btn mb-4" disabled={!form.supplierId || form.items.length === 0}>Add Purchase</button>
            <h2 className="text-xl font-bold mb-2">Purchase History</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Supplier</th>
                        <th>Invoice ID</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((p, idx) => (
                        <tr key={idx}>
                            <td>{p.invoice_date}</td>
                            <td>{p.supplier_name}</td>
                            <td>{p.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Purchases;