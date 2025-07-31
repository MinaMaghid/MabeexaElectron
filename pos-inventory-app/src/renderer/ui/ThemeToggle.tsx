import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark', dark);
    }, [dark]);

    return (
        <button
            className="btn"
            onClick={() => setDark(d => !d)}
            style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000 }}
        >
            {dark ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
};

export default ThemeToggle;