import React, { useState } from 'react';

const PrintDemo = () => {
    const [printerName, setPrinterName] = useState('');
    const receiptHtml = `
        <div style="width:58mm;font-family:monospace;">
            <h2>Store Name</h2>
            <p>Thank you for your purchase!</p>
            <hr/>
            <p>Item 1 x2 - $10</p>
            <p>Item 2 x1 - $5</p>
            <hr/>
            <p>Total: $15</p>
        </div>
    `;
    const a4Html = `
        <div style="width:210mm;font-family:sans-serif;">
            <h1>Invoice</h1>
            <p>Customer: John Doe</p>
            <table border="1" width="100%">
                <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
                <tr><td>Item 1</td><td>2</td><td>$10</td></tr>
                <tr><td>Item 2</td><td>1</td><td>$5</td></tr>
            </table>
            <p>Total: $15</p>
        </div>
    `;

    const handlePrintReceipt = async () => {
        await window.api.printReceipt(receiptHtml, printerName);
        alert('Receipt sent to printer!');
    };

    const handlePrintA4 = async () => {
        await window.api.printA4(a4Html, printerName);
        alert('A4 invoice sent to printer!');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Printing Demo</h1>
            <input
                value={printerName}
                onChange={e => setPrinterName(e.target.value)}
                placeholder="Printer Name (optional)"
                className="input mb-2"
            />
            <button onClick={handlePrintReceipt} className="btn mb-2">Print Receipt (58mm/80mm)</button>
            <button onClick={handlePrintA4} className="btn mb-2">Print Invoice (A4)</button>
        </div>
    );
};

export default PrintDemo;