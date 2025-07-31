import React, { useState } from 'react';

const GlobalSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    return (
        <div className="mb-4 flex gap-2">
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, customers, invoices..."
                className="input"
            />
            <button className="btn" onClick={() => onSearch(query)}>Search</button>
        </div>
    );
};

export default GlobalSearch;