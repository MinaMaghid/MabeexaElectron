import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import MainLayout from './MainLayout';

const App = () => (
    <ErrorBoundary>
        <MainLayout />
    </ErrorBoundary>
);

export default App;