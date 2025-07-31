import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalProducts: 0,
        lowStock: [],
        todaySales: 0,
        salesChart: [],
    });

    const [sales, setSales] = useState(0);
    const [stock, setStock] = useState(0);
    const [expenses, setExpenses] = useState(0);

    useEffect(() => {
        window.api.getDashboardStats().then(setStats);

        window.api.getSalesReport(/*today*/ new Date().toISOString().slice(0,10), new Date().toISOString().slice(0,10)).then(data => setSales(data.length));
        window.api.getStockReport().then(data => setStock(data.reduce((sum, item) => sum + item.quantity, 0)));
        window.api.getTotalExpenses().then(setExpenses);
    }, []);

    const chartData = {
        labels: stats.salesChart.map(item => item.date),
        datasets: [
            {
                label: 'Sales (last 7 days)',
                data: stats.salesChart.map(item => item.total),
                fill: false,
                backgroundColor: '#2563eb',
                borderColor: '#2563eb',
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: 'Sales Trend' },
        },
    };

    return (
        <div className="dashboard p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Sales</h2>
                    <div className="text-2xl">{stats.totalSales}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Products in Stock</h2>
                    <div className="text-2xl">{stats.totalProducts}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Today's Sales</h2>
                    <div className="text-2xl">{stats.todaySales}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Low Stock Products</h2>
                    <ul>
                        {stats.lowStock.map((item, idx) => (
                            <li key={idx}>{item.name} ({item.quantity})</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Sales Chart</h2>
                <Line data={chartData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-2">Today's Sales</h2>
                    <div className="text-3xl">{sales}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-2">Total Stock</h2>
                    <div className="text-3xl">{stock}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-2">Total Expenses</h2>
                    <div className="text-3xl">{expenses}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;