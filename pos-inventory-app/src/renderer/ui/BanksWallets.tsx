import React, { useEffect, useState } from 'react';

const BanksWallets = () => {
    const [accounts, setAccounts] = useState([]);
    const [form, setForm] = useState({ name: '', type: 'Bank', balance: 0 });
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [txnForm, setTxnForm] = useState({ amount: '', reference: '', date: '', direction: 'in' });

    useEffect(() => {
        window.api.getBankAccounts().then(setAccounts);
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleTxnChange = (e) => setTxnForm({ ...txnForm, [e.target.name]: e.target.value });

    const handleAddAccount = async () => {
        await window.api.addBankAccount(form.name, form.type, Number(form.balance));
        setForm({ name: '', type: 'Bank', balance: 0 });
        setAccounts(await window.api.getBankAccounts());
    };

    const handleSelectAccount = async (id) => {
        setSelectedAccount(id);
        setTransactions(await window.api.getTransactions(id));
    };

    const handleAddTransaction = async () => {
        await window.api.addTransaction(
            selectedAccount,
            Number(txnForm.amount),
            txnForm.reference,
            txnForm.date,
            txnForm.direction
        );
        setTxnForm({ amount: '', reference: '', date: '', direction: 'in' });
        setTransactions(await window.api.getTransactions(selectedAccount));
        setAccounts(await window.api.getBankAccounts());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Banks & e-Wallets</h1>
            <div className="mb-4 flex gap-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Account Name" className="input" />
                <select name="type" value={form.type} onChange={handleChange} className="input">
                    <option value="Bank">Bank</option>
                    <option value="e-Wallet">e-Wallet</option>
                </select>
                <input name="balance" value={form.balance} onChange={handleChange} type="number" placeholder="Initial Balance" className="input" />
                <button onClick={handleAddAccount} className="btn">Add Account</button>
            </div>
            <table className="table-auto w-full mb-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(acc => (
                        <tr key={acc.id}>
                            <td>{acc.name}</td>
                            <td>{acc.type}</td>
                            <td>{acc.balance}</td>
                            <td>
                                <button onClick={() => handleSelectAccount(acc.id)} className="btn">View Transactions</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedAccount && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold mb-2">Transactions</h2>
                    <div className="mb-2 flex gap-2">
                        <input name="amount" value={txnForm.amount} onChange={handleTxnChange} type="number" placeholder="Amount" className="input" />
                        <input name="reference" value={txnForm.reference} onChange={handleTxnChange} placeholder="Reference" className="input" />
                        <input name="date" value={txnForm.date} onChange={handleTxnChange} type="date" className="input" />
                        <select name="direction" value={txnForm.direction} onChange={handleTxnChange} className="input">
                            <option value="in">Deposit</option>
                            <option value="out">Withdrawal</option>
                        </select>
                        <button onClick={handleAddTransaction} className="btn">Add Transaction</button>
                    </div>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Reference</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn, idx) => (
                                <tr key={idx}>
                                    <td>{txn.transaction_date}</td>
                                    <td>{txn.amount}</td>
                                    <td>{txn.reference}</td>
                                    <td>{txn.direction === 'in' ? 'Deposit' : 'Withdrawal'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BanksWallets;