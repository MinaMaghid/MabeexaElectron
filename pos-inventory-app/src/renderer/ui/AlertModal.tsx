import React from 'react';

const AlertModal = ({ open, message, onClose }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg min-w-[300px]">
                <div className="mb-4">{message}</div>
                <button className="btn" onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default AlertModal;