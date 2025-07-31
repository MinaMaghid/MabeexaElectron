import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return <div className="p-6 text-red-600">Something went wrong: {this.state.error?.message}</div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;