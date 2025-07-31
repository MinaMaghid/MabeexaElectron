import React, { useEffect, useState } from 'react';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', items: [] });
    const [item, setItem] = useState({ productId: '', quantity: 1 });

    useEffect(() => {
        window.api.getPackages().then(setPackages);
        window.api.getProducts().then(setProducts);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleItemChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

    const addItem = () => {
        setForm({ ...form, items: [...form.items, { ...item, quantity: Number(item.quantity) }] });
        setItem({ productId: '', quantity: 1 });
    };

    const handleAddPackage = async () => {
        await window.api.addPackage(form.name, form.items);
        setForm({ name: '', items: [] });
        setPackages(await window.api.getPackages());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Sales Packages</h1>
            <div className="mb-4 flex gap-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Package Name" className="input" />
            </div>
            <div className="mb-4 flex gap-2">
                <select name="productId" value={item.productId} onChange={handleItemChange} className="input">
                    <option value="">Select Product</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input name="quantity" value={item.quantity} onChange={handleItemChange} type="number" min="1" className="input" />
                <button onClick={addItem} className="btn">Add Item</button>
            </div>
            <div className="mb-4">
                <h2 className="font-semibold mb-2">Package Items</h2>
                <ul>
                    {form.items.map((it, idx) => (
                        <li key={idx}>{products.find(p => p.id === Number(it.productId))?.name || ''} x{it.quantity}</li>
                    ))}
                </ul>
            </div>
            <button onClick={handleAddPackage} className="btn mb-4" disabled={!form.name || form.items.length === 0}>Add Package</button>
            <h2 className="text-xl font-bold mb-2">Existing Packages</h2>
            <ul>
                {packages.map(pkg => (
                    <li key={pkg.id}>{pkg.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Packages;