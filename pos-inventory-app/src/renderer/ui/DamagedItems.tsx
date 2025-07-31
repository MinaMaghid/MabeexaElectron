import React, { useEffect, useState } from 'react';

const DamagedItems = () => {
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ productId: '', quantity: 1, note: '', damaged_date: '' });

    useEffect(() => {
        window.api.getDamagedItems().then(setItems);
        window.api.getProducts().then(setProducts);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async () => {
        await window.api.addDamagedItem(form.productId, Number(form.quantity), form.note, form.damaged_date);
        setForm({ productId: '', quantity: 1, note: '', damaged_date: '' });
        setItems(await window.api.getDamagedItems());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Damaged/Lost Items</h1>
            <div className="mb-4 flex gap-2">
                <select name="productId" value={form.productId} onChange={handleChange} className="input">
                    <option value="">Select Product</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="1" className="input" />
                <input name="note" value={form.note} onChange={handleChange} placeholder="Note" className="input" />
                <input name="damaged_date" value={form.damaged_date} onChange={handleChange} type="date" className="input" />
                <button onClick={handleAdd} className="btn">Add Damaged/Lost Item</button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.damaged_date}</td>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DamagedItems;