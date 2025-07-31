import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Categories = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        window.api.getCategories().then(setCategories);
    }, []);

    const handleAdd = async () => {
        await window.api.addCategory(name);
        setName('');
        setCategories(await window.api.getCategories());
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{t('Category')}</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder={t('Category')} className="input" />
            <button onClick={handleAdd} className="btn">{t('Add Category')}</button>
            <ul>
                {categories.map(cat => <li key={cat.id}>{cat.name}</li>)}
            </ul>
        </div>
    );
};

export default Categories;