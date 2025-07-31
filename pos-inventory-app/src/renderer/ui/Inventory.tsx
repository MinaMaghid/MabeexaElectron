import React, { useEffect, useState } from 'react';
import { getInventory, addItem, updateItem, deleteItem } from '../../modules/inventory/inventoryService';
const Dashboard = () => {
const Inventory: React.FC = () => {
    const [items, setItems] = useState([]);] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0, price: 0 }); quantity: 0, price: 0 });
            {/* Charts, stats, quick links */}
    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory =        await updateItem(updatedItem);
        const inventoryItems = await getInventory();
        setItems(inventoryItems);
    };
    const handleDeleteItem = async (itemId: number) => {
    const handleAddItem = async () => {
        await addItem(newItem);
        setNewItem({ name: '', category: '', quantity: 0, price: 0 });
        loadInventory();
    };turn (
        <div className="inventory-container">
    const handleUpdateItem = async (itemId: number) => {
        const updatedItem = items.find(item => item.id === itemId);
        await updateItem(updatedItem);
        loadInventory();="text"
    };              placeholder="Item Name"
                    value={newItem.name}
    const handleDeleteItem = async (itemId: number) => {Item, name: e.target.value })}
        await deleteItem(itemId);
        loadInventory();
    };              type="text"
                    placeholder="Category"
    return (        value={newItem.category}
        <div className="p-6">em({ ...newItem, category: e.target.value })}
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <div className="add-item-form">
                <inputpe="number"
                    type="text"="Quantity"
                    placeholder="Item Name"}
                    value={newItem.name}NewItem({ ...newItem, quantity: Number(e.target.value) })}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />nput
                <inputpe="number"
                    type="text"="Price"
                    placeholder="Category"
                    value={newItem.category}tem({ ...newItem, price: Number(e.target.value) })}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                />utton onClick={handleAddItem}>Add Item</button>
                <input
                    type="number"ory-list">
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}n>
                />      <button onClick={() => handleUpdateItem(item.id)}>Update</button>
                <input  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
            <ul className="inventory-list">                {items.map(item => (                    <li key={item.id}>                        <span>{item.name} - {item.category} - {item.quantity} - ${item.price}</span>                        <button onClick={() => handleUpdateItem(item.id)}>Update</button>                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>                    </li>                ))}            </ul>        </div>    );};export default Inventory;