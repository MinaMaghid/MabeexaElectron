import React, { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', sku: '', barcode: '', price: '', cost_price: '', quantity: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        window.api.getProducts().then(setProducts);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async () => {
        if (!form.name || !form.price || !form.quantity) return;
        await window.api.addProduct(form.name, form.sku, form.barcode, Number(form.price), Number(form.cost_price), Number(form.quantity));
        setForm({ name: '', sku: '', barcode: '', price: '', cost_price: '', quantity: '' });
        setProducts(await window.api.getProducts());
    };

    const handleEdit = (product) => {
        setForm({ ...product });
        setEditingId(product.id);
    };

    const handleUpdate = async () => {
        await window.api.updateProduct(editingId, form.name, form.sku, form.barcode, Number(form.price), Number(form.cost_price), Number(form.quantity));
        setEditingId(null);
        setForm({ name: '', sku: '', barcode: '', price: '', cost_price: '', quantity: '' });
        setProducts(await window.api.getProducts());
    };

    const handleDelete = async (id) => {
        await window.api.deleteProduct(id);
        setProducts(await window.api.getProducts());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="mb-4 flex gap-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
                <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" className="input" />
                <input name="barcode" value={form.barcode} onChange={handleChange} placeholder="Barcode" className="input" />
                <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price" className="input" />
                <input name="cost_price" value={form.cost_price} onChange={handleChange} type="number" placeholder="Cost Price" className="input" />
                <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="Quantity" className="input" />
                <button onClick={editingId ? handleUpdate : handleAdd} className="btn">
                    {editingId ? 'Update' : 'Add'}
                </button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Barcode</th>
                        <th>Price</th>
                        <th>Cost Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.barcode}</td>
                            <td>{product.price}</td>
                            <td>{product.cost_price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => handleEdit(product)} className="btn">Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;