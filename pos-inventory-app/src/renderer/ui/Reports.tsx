import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { fetchReports } from '../../modules/reports/reportService';
import { Report } from '../../types';

const Reports: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [sales, setSales] = useState([]);
    const [profitLoss, setProfitLoss] = useState({ sales: [], profit: 0 });
    const [stock, setStock] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [customerBalance, setCustomerBalance] = useState(0);
    const [supplierId, setSupplierId] = useState('');
    const [supplierBalance, setSupplierBalance] = useState(0);
    const [dates, setDates] = useState({ startDate: '', endDate: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const data = await fetchReports();
                setReports(data);
            } catch (err) {
                setError('Failed to load reports');
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);

    const fetchSalesReport = async () => {
        setSales(await window.api.getSalesReport(dates.startDate, dates.endDate));
    };

    const fetchProfitLossReport = async () => {
        setProfitLoss(await window.api.getProfitLossReport(dates.startDate, dates.endDate));
    };

    const fetchStockReport = async () => {
        setStock(await window.api.getStockReport());
    };

    const fetchCustomerBalance = async () => {
        setCustomerBalance(await window.api.getCustomerBalance(customerId));
    };

    const fetchSupplierBalance = async () => {
        setSupplierBalance(await window.api.getSupplierBalance(supplierId));
    };

    const exportPDF = (title, rows) => {
        const doc = new jsPDF();
        doc.text(title, 10, 10);
        rows.forEach((row, idx) => {
            doc.text(JSON.stringify(row), 10, 20 + idx * 8);
        });
        doc.save(`${title.replace(/\s/g, '_').toLowerCase()}.pdf`);
    };

    if (loading) {
        return <div>Loading reports...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <div className="mb-4 flex gap-2">
                <input name="startDate" type="date" value={dates.startDate} onChange={e => setDates({ ...dates, startDate: e.target.value })} className="input" />
                <input name="endDate" type="date" value={dates.endDate} onChange={e => setDates({ ...dates, endDate: e.target.value })} className="input" />
                <button onClick={fetchSalesReport} className="btn">Sales Report</button>
                <button onClick={fetchProfitLossReport} className="btn">Profit/Loss Report</button>
                <button onClick={fetchStockReport} className="btn">Stock Report</button>
            </div>
            <div className="mb-4 flex gap-2">
                <input name="customerId" value={customerId} onChange={e => setCustomerId(e.target.value)} placeholder="Customer ID" className="input" />
                <button onClick={fetchCustomerBalance} className="btn">Customer Balance</button>
                <input name="supplierId" value={supplierId} onChange={e => setSupplierId(e.target.value)} placeholder="Supplier ID" className="input" />
                <button onClick={fetchSupplierBalance} className="btn">Supplier Balance</button>
            </div>
            {sales.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Sales Report</h2>
                    <button onClick={() => exportPDF('Sales Report', sales)} className="btn mb-2">Export PDF</button>
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
                            {sales.map((s, idx) => (
                                <tr key={idx}>
                                    <td>{s.sale_date}</td>
                                    <td>{s.product_name}</td>
                                    <td>{s.quantity}</td>
                                    <td>{s.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {profitLoss.sales.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Profit/Loss Report</h2>
                    <button onClick={() => exportPDF('Profit Loss Report', profitLoss.sales)} className="btn mb-2">Export PDF</button>
                    <div className="font-bold mb-2">Total Profit: {profitLoss.profit}</div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Cost Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profitLoss.sales.map((s, idx) => (
                                <tr key={idx}>
                                    <td>{s.sale_date}</td>
                                    <td>{s.product_name}</td>
                                    <td>{s.quantity}</td>
                                    <td>{s.total_price}</td>
                                    <td>{s.cost_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {stock.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Stock Report</h2>
                    <button onClick={() => exportPDF('Stock Report', stock)} className="btn mb-2">Export PDF</button>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stock.map((s, idx) => (
                                <tr key={idx}>
                                    <td>{s.name}</td>
                                    <td>{s.quantity}</td>
                                    <td>{s.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {customerBalance !== 0 && (
                <div className="mb-4 font-bold">Customer Balance: {customerBalance}</div>
            )}
            {supplierBalance !== 0 && (
                <div className="mb-4 font-bold">Supplier Balance: {supplierBalance}</div>
            )}
        </div>
    );
};

export default Reports;