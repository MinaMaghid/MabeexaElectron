import React, { useEffect, useState } from 'react';

const SecurityLicensing = () => {
    const [licenseKey, setLicenseKey] = useState('');
    const [status, setStatus] = useState({ valid: false, machineId: '', licenseKey: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        window.api.getLicenseStatus().then(setStatus);
    }, []);

    const handleValidate = async () => {
        const result = await window.api.validateLicense(licenseKey);
        setStatus(result);
        setMessage(result.valid ? 'License is valid!' : 'Invalid license key.');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Security & Licensing</h1>
            <div className="mb-2">Machine ID: <span className="font-mono">{status.machineId}</span></div>
            <input
                value={licenseKey}
                onChange={e => setLicenseKey(e.target.value)}
                placeholder="Enter License Key"
                className="input mb-2"
            />
            <button onClick={handleValidate} className="btn mb-2">Validate License</button>
            {message && <div className={status.valid ? "text-green-600" : "text-red-600"}>{message}</div>}
            <div className="mt-4">
                <strong>Current License Key:</strong> <span className="font-mono">{status.licenseKey}</span>
            </div>
        </div>
    );
};

export default SecurityLicensing;