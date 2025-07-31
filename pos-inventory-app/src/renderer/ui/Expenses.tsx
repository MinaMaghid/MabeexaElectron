import React, { useEffect, useState } from 'react';

const categories = ['Rent', 'Utilities', 'Supplies', 'Salaries', 'Other'];

const Expenses = ({ isAdmin }) => {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ amount: '', category: categories[0], note: '', expense_date: '' });
    const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        window.api.getExpenses(filters).then(setExpenses);
        if (isAdmin) window.api.getTotalExpenses().then(setTotal);
    }, [filters, isAdmin]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const handleAdd = async () => {
        await window.api.addExpense(Number(form.amount), form.category, form.note, form.expense_date);
        setForm({ amount: '', category: categories[0], note: '', expense_date: '' });
        setExpenses(await window.api.getExpenses(filters));
        if (isAdmin) setTotal(await window.api.getTotalExpenses());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            <div className="mb-4 flex gap-2">
                <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" type="number" className="input" />
                <select name="category" value={form.category} onChange={handleChange} className="input">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input name="note" value={form.note} onChange={handleChange} placeholder="Note" className="input" />
                <input name="expense_date" value={form.expense_date} onChange={handleChange} type="date" className="input" />
                <button onClick={handleAdd} className="btn">Add Expense</button>
            </div>
            <div className="mb-4 flex gap-2">
                <select name="category" value={filters.category} onChange={handleFilterChange} className="input">
                    <option value="">All Categories</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input name="startDate" value={filters.startDate} onChange={handleFilterChange} type="date" className="input" />
                <input name="endDate" value={filters.endDate} onChange={handleFilterChange} type="date" className="input" />
            </div>
            {isAdmin && (
                <div className="mb-4 font-bold">
                    Total Expenses: {total}
                </div>
            )}
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((exp, idx) => (
                        <tr key={idx}>
                            <td>{exp.expense_date}</td>
                            <td>{exp.amount}</td>
                            <td>{exp.category}</td>
                            <td>{exp.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Expenses;