import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { processSale } from '../../modules/sales/salesService';
import './Sales.css';

const Sales: React.FC = () => {
    const [items, setItems] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
    const [total, setTotal] = useState(0);
    const [payment, setPayment] = useState(0);
    const [change, setChange] = useState(0);
    const [sales, setSales] = useState([]);
    const [filters, setFilters] = useState({ customerId: '', userId: '', startDate: '', endDate: '' });

    useEffect(() => {
        window.api.getSales(filters).then(setSales);
    }, [filters]);

    const addItem = (item: { id: number; name: string; price: number }) => {
        const existingItem = items.find(i => i.id === item.id);
        if (existingItem) {
            setItems(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
            setItems([...items, { ...item, quantity: 1 }]);
        }
        calculateTotal();
    };

    const calculateTotal = () => {
        const newTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);
    };

    const handlePayment = () => {
        const changeAmount = payment - total;
        if (changeAmount < 0) {
            alert('Insufficient payment');
        } else {
            setChange(changeAmount);
            processSale(items, total, payment);
            resetSale();
        }
    };

    const resetSale = () => {
        setItems([]);
        setTotal(0);
        setPayment(0);
        setChange(0);
    };

    const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Sales Report', 10, 10);
        sales.forEach((sale, idx) => {
            doc.text(
                `${idx + 1}. ${sale.sale_date} - ${sale.product_name} x${sale.quantity} - ${sale.total_price} - ${sale.customer_name || ''}`,
                10,
                20 + idx * 8
            );
        });
        doc.save('sales_report.pdf');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Sales</h1>
            <div className="items-list">
                {items.map(item => (
                    <div key={item.id} className="item">
                        <span>{item.name}</span>
                        <span>{item.price} x {item.quantity}</span>
                    </div>
                ))}
            </div>
            <div className="total">
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
            <input
                type="number"
                placeholder="Enter payment amount"
                value={payment}
                onChange={(e) => setPayment(Number(e.target.value))}
            />
            <button onClick={handlePayment}>Process Sale</button>
            {change > 0 && <div className="change">Change: ${change.toFixed(2)}</div>}

            <h1 className="text-2xl font-bold mb-4">Sales History</h1>
            <div className="mb-4 flex gap-2">
                <input name="customerId" value={filters.customerId} onChange={handleChange} placeholder="Customer ID" className="input" />
                <input name="userId" value={filters.userId} onChange={handleChange} placeholder="User ID" className="input" />
                <input name="startDate" type="date" value={filters.startDate} onChange={handleChange} className="input" />
                <input name="endDate" type="date" value={filters.endDate} onChange={handleChange} className="input" />
                <button onClick={exportPDF} className="btn">Export PDF</button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>User</th>
                        <th>Customer</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, idx) => (
                        <tr key={idx}>
                            <td>{sale.sale_date}</td>
                            <td>{sale.product_name}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.total_price}</td>
                            <td>{sale.user_name}</td>
                            <td>{sale.customer_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sales;