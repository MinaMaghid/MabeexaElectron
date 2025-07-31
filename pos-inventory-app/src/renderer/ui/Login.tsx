import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const valid = await window.api.verifyPassword(username, password);
        if (valid) {
            const user = await window.api.getUserByUsername(username);
            onLogin(user);
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="input mb-2" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input mb-2" />
            <button onClick={handleLogin} className="btn w-full">Login</button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
};

export default Login;