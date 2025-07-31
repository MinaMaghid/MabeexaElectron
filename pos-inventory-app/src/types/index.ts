export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export interface Sale {
    id: number;
    productId: number;
    quantity: number;
    total: number;
    date: Date;
}

export interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'user';
}

export interface Report {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

export interface Settings {
    printer: string;
    licenseKey: string;
}