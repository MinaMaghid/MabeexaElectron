import React, { useState } from 'react';
import SideNav from './SideNav';
import ThemeToggle from './ThemeToggle';
// Import your page components here
import Dashboard from './Dashboard';
import Products from './Products';
import Customers from './Customers';
import Sales from './Sales';
import Reports from './Reports';
import Settings from './Settings';

const routes = {
    '/dashboard': <Dashboard />,
    '/products': <Products />,
    '/customers': <Customers />,
    '/sales': <Sales />,
    '/reports': <Reports />,
    '/settings': <Settings />,
};

const MainLayout = () => {
    const [route, setRoute] = useState('/dashboard');

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <SideNav onNavigate={setRoute} activeRoute={route} />
            <ThemeToggle />
            <main className="flex-1 ml-56 p-6 transition-all duration-300">
                {routes[route]}
            </main>
        </div>
    );
};

export default MainLayout;