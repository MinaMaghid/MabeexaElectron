import React, { useEffect, useState } from 'react';

const Returns = () => {
    const [returns, setReturns] = useState([]);
    const [form, setForm] = useState({ saleId: '', productId: '', quantity: 1, reason: '' });

    useEffect(() => {
        window.api.getReturns().then(setReturns);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleProcessReturn = async () => {
        await window.api.processReturn(form.saleId, form.productId, Number(form.quantity), form.reason);
        setForm({ saleId: '', productId: '', quantity: 1, reason: '' });
        setReturns(await window.api.getReturns());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product Returns</h1>
            <div className="mb-4 flex gap-2">
                <input name="saleId" value={form.saleId} onChange={handleChange} placeholder="Sale ID" className="input" />
                <input name="productId" value={form.productId} onChange={handleChange} placeholder="Product ID" className="input" />
                <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="input" />
                <input name="reason" value={form.reason} onChange={handleChange} placeholder="Reason" className="input" />
                <button onClick={handleProcessReturn} className="btn">Process Return</button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>Quantity</th>
                        <th>Reason</th>
                        <th>Sale ID</th>
                    </tr>
                </thead>
                <tbody>
                    {returns.map((ret, idx) => (
                        <tr key={idx}>
                            <td>{ret.return_date}</td>
                            <td>{ret.product_name}</td>
                            <td>{ret.customer_name}</td>
                            <td>{ret.quantity}</td>
                            <td>{ret.reason}</td>
                            <td>{ret.sale_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Returns;