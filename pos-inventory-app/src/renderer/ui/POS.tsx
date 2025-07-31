import React, { useEffect, useState, useRef } from 'react';

const paymentMethods = [
    'Cash',
    'Bank Transfer',
    'Credit Card',
    'Debit Card',
    'e-Wallet',
    'Cheque',
    'Mobile Payment'
];

const POS = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [cart, setCart] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [discount, setDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
    const [receipt, setReceipt] = useState(null);
    const [barcodeInput, setBarcodeInput] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');
    const barcodeTimer = useRef(null);

    useEffect(() => {
        window.api.getProductsForPOS().then(setProducts);
        window.api.getCustomers().then(setCustomers);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (barcodeTimer.current) clearTimeout(barcodeTimer.current);
            setBarcodeInput(prev => prev + e.key);
            barcodeTimer.current = setTimeout(() => {
                if (barcodeInput.length >= 6) { // Minimum barcode length
                    const found = products.find(p => p.barcode === barcodeInput);
                    if (found) addToCart(found);
                }
                setBarcodeInput('');
            }, 100); // Barcode scanners send all keys quickly
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [barcodeInput, products]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, qty) => {
        setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleSale = async () => {
        const result = await window.api.addSale(cart, customerId, discount, paymentMethod, paymentDetails);
        setReceipt({
            items: cart,
            total: result.totalPrice,
            discount,
            paymentMethod,
            customer: customers.find(c => c.id === customerId)?.name || '',
        });
        setCart([]);
        setDiscount(0);
        setCustomerId('');
        setPaymentMethod(paymentMethods[0]);
        window.api.getProductsForPOS().then(setProducts); // Refresh stock
    };

    const printReceipt = () => {
        const printContents = document.getElementById('receipt').innerHTML;
        const win = window.open('', '', 'width=400,height=600');
        win.document.write('<html><body>' + printContents + '</body></html>');
        win.document.close();
        win.print();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>
            <div className="mb-4">
                <select value={customerId} onChange={e => setCustomerId(e.target.value)} className="input">
                    <option value="">Select Customer (optional)</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} placeholder="Discount" className="input" />
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="input">
                    {paymentMethods.map(method => <option key={method} value={method}>{method}</option>)}
                </select>
                {['Bank Transfer', 'Credit Card', 'Debit Card', 'Cheque', 'Mobile Payment', 'e-Wallet'].includes(paymentMethod) && (
                    <input
                        type="text"
                        value={paymentDetails}
                        onChange={e => setPaymentDetails(e.target.value)}
                        placeholder={`Enter ${paymentMethod} details`}
                        className="input mt-2"
                    />
                )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <h2 className="font-semibold mb-2">Products</h2>
                    <ul>
                        {products.map(prod => (
                            <li key={prod.id} className="flex justify-between items-center mb-1">
                                <span>{prod.name} ({prod.price})</span>
                                <button onClick={() => addToCart(prod)} className="btn">Add</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Cart</h2>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id} className="flex items-center mb-1">
                                <span>{item.name}</span>
                                <input type="number" min="1" value={item.quantity}
                                    onChange={e => updateQuantity(item.id, Number(e.target.value))}
                                    className="input mx-2 w-16" />
                                <span>{item.price * item.quantity}</span>
                                <button onClick={() => removeFromCart(item.id)} className="btn ml-2">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-2 font-bold">
                        Total: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0) - discount}
                    </div>
                    <button onClick={handleSale} className="btn mt-2" disabled={cart.length === 0}>Complete Sale</button>
                </div>
            </div>
            {receipt && (
                <div id="receipt" className="bg-white p-4 rounded shadow mt-4 max-w-md">
                    <h2 className="text-lg font-bold mb-2">Receipt</h2>
                    <div>Customer: {receipt.customer}</div>
                    <div>Payment: {receipt.paymentMethod}</div>
                    <ul>
                        {receipt.items.map((item, idx) => (
                            <li key={idx}>{item.name} x {item.quantity} = {item.price * item.quantity}</li>
                        ))}
                    </ul>
                    <div>Discount: {receipt.discount}</div>
                    <div className="font-bold">Total: {receipt.total}</div>
                    <button onClick={printReceipt} className="btn mt-2">Print Receipt</button>
                </div>
            )}
            <div className="mb-2 text-sm text-gray-500">
                Scan barcode to add product automatically.
            </div>
        </div>




export default POS;};    );    );
};

export default POS;