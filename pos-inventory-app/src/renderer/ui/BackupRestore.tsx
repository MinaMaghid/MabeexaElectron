import React, { useEffect, useState } from 'react';

const BackupRestore = () => {
    const [backups, setBackups] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        window.api.listBackups().then(setBackups);
    }, []);

    const handleBackup = async () => {
        const file = await window.api.createBackup();
        setMessage(`Backup created: ${file}`);
        setBackups(await window.api.listBackups());
    };

    const handleRestore = async (file) => {
        await window.api.restoreBackup(file);
        setMessage(`Restored from: ${file}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Backup & Restore</h1>
            <button onClick={handleBackup} className="btn mb-4">Create Backup</button>
            {message && <div className="mb-4 text-green-600">{message}</div>}
            <h2 className="text-lg font-bold mb-2">Available Backups</h2>
            <ul>
                {backups.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-2 mb-2">
                        <span>{file}</span>
                        <button onClick={() => handleRestore(file)} className="btn">Restore</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BackupRestore;