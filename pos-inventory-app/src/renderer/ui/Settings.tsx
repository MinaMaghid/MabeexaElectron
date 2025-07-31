import React, { useEffect, useState } from 'react';

const defaultSettings = {
    printer: '',
    barcodeScanner: '',
    storageType: 'sqlite',
    licenseKey: '',
    receiptTemplate: '',
    posOptions: '',
};

const Settings = () => {
    const [settings, setSettings] = useState(defaultSettings);

    useEffect(() => {
        window.api.getSettings().then(s => setSettings({ ...defaultSettings, ...s }));
    }, []);

    const handleChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });

    const handleSave = async () => {
        for (const key in settings) {
            await window.api.setSetting(key, settings[key]);
        }
        alert('Settings saved!');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <div className="mb-4 flex flex-col gap-2 max-w-lg">
                <input name="printer" value={settings.printer} onChange={handleChange} placeholder="Printer Name/ID" className="input" />
                <input name="barcodeScanner" value={settings.barcodeScanner} onChange={handleChange} placeholder="Barcode Scanner Name/ID" className="input" />
                <select name="storageType" value={settings.storageType} onChange={handleChange} className="input">
                    <option value="sqlite">SQLite</option>
                    <option value="mysql">MySQL</option>
                </select>
                <input name="licenseKey" value={settings.licenseKey} onChange={handleChange} placeholder="License Key" className="input" />
                <textarea name="receiptTemplate" value={settings.receiptTemplate} onChange={handleChange} placeholder="Receipt Template" className="input" />
                <textarea name="posOptions" value={settings.posOptions} onChange={handleChange} placeholder="POS Options (JSON)" className="input" />
                <button onClick={handleSave} className="btn mt-2">Save Settings</button>
            </div>
        </div>
    );
};

export default Settings;