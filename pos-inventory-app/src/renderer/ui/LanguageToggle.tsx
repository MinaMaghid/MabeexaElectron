import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
    const { i18n } = useTranslation();
    return (
        <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
            <button className="btn mx-1" onClick={() => i18n.changeLanguage('en')}>EN</button>
            <button className="btn mx-1" onClick={() => i18n.changeLanguage('ar')}>AR</button>
        </div>
    );
};

export default LanguageToggle;