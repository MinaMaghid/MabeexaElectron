import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Dashboard from './Dashboard';
import Products from './Products';
import Customers from './Customers';
import Suppliers from './Suppliers';
import Sales from './Sales';
import Purchases from './Purchases';
import Returns from './Returns';
import Expenses from './Expenses';
import DamagedItems from './DamagedItems';
import BanksWallets from './BanksWallets';
import Reports from './Reports';
import BackupRestore from './BackupRestore';
import SecurityLicensing from './SecurityLicensing';
import Settings from './Settings';
import Packages from './Packages';
import AuditLog from './AuditLog';
import Users from './Users';
import BarcodeGenerator from './BarcodeGenerator';
import About from './About';
import NotFound from './NotFound';

const routes = [
    { path: '/dashboard', component: <Dashboard />, roles: ['admin', 'cashier'] },
    { path: '/products', component: <Products />, roles: ['admin'] },
    { path: '/customers', component: <Customers />, roles: ['admin', 'cashier'] },
    { path: '/suppliers', component: <Suppliers />, roles: ['admin'] },
    { path: '/sales', component: <Sales />, roles: ['admin', 'cashier'] },
    { path: '/purchases', component: <Purchases />, roles: ['admin'] },
    { path: '/returns', component: <Returns />, roles: ['admin', 'cashier'] },
    { path: '/expenses', component: <Expenses />, roles: ['admin'] },
    { path: '/damaged', component: <DamagedItems />, roles: ['admin'] },
    { path: '/banks', component: <BanksWallets />, roles: ['admin'] },
    { path: '/reports', component: <Reports />, roles: ['admin'] },
    { path: '/backup', component: <BackupRestore />, roles: ['admin'] },
    { path: '/security', component: <SecurityLicensing />, roles: ['admin'] },
    { path: '/settings', component: <Settings />, roles: ['admin'] },
    { path: '/packages', component: <Packages />, roles: ['admin'] },
    { path: '/audit', component: <AuditLog />, roles: ['admin'] },
    { path: '/users', component: <Users />, roles: ['admin'] },
    { path: '/barcode', component: <BarcodeGenerator />, roles: ['admin'] },
    { path: '/about', component: <About />, roles: ['admin', 'cashier'] },
];

const AppRouter = ({ route }) => {
    const { user } = useAuth();
    const found = routes.find(r => r.path === route);
    if (!found) return <NotFound />;
    if (!user || !found.roles.includes(user.role)) {
        return <div className="p-6 text-red-600">Access Denied</div>;
    }
    return found.component;
};

export default AppRouter;