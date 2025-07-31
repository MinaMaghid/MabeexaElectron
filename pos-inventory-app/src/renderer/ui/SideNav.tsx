import React from 'react';
import { FaHome, FaBox, FaUsers, FaMoneyBill, FaChartBar, FaCog } from 'react-icons/fa';

const navItems = [
    { label: 'Dashboard', icon: <FaHome />, route: '/dashboard' },
    { label: 'Products', icon: <FaBox />, route: '/products' },
    { label: 'Customers', icon: <FaUsers />, route: '/customers' },
    { label: 'Sales', icon: <FaMoneyBill />, route: '/sales' },
    { label: 'Reports', icon: <FaChartBar />, route: '/reports' },
    { label: 'Settings', icon: <FaCog />, route: '/settings' },
];

const SideNav = ({ onNavigate, activeRoute }) => (
    <nav className="bg-gray-100 dark:bg-gray-900 h-screen w-56 flex flex-col py-6 px-2 fixed left-0 top-0">
        {navItems.map(item => (
            <button
                key={item.route}
                className={`flex items-center gap-2 px-4 py-2 rounded mb-2 ${activeRoute === item.route ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 dark:hover:bg-blue-800'}`}
                onClick={() => onNavigate(item.route)}
            >
                {item.icon}
                <span>{item.label}</span>
            </button>
        ))}
    </nav>
);

export default SideNav;