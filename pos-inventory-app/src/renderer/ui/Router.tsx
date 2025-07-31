import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Products from './Products';
import Customers from './Customers';
import Sales from './Sales';
import Reports from './Reports';
import Settings from './Settings';
import NotFound from './NotFound';

const routes = {
    '/dashboard': <Dashboard />,
    '/products': <Products />,
    '/customers': <Customers />,
    '/sales': <Sales />,
    '/reports': <Reports />,
    '/settings': <Settings />,
};

const Router = ({ route }) => {
    return routes[route] || <NotFound />;
};

export default Router;