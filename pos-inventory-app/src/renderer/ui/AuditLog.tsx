import React, { useEffect, useState } from 'react';

const AuditLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        window.api.getAuditLogs().then(setLogs);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Audit Log</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, idx) => (
                        <tr key={idx}>
                            <td>{log.date}</td>
                            <td>{log.user}</td>
                            <td>{log.action}</td>
                            <td>{log.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuditLog;