import { getSalesData, getInventoryData } from '../database/sqlite'; // or '../database/mysql' based on the database choice
import { formatDate } from '../utils/dateUtils';

export const generateSalesReport = async (startDate: Date, endDate: Date) => {
    const salesData = await getSalesData(startDate, endDate);
    return formatSalesData(salesData);
};

export const generateInventoryReport = async () => {
    const inventoryData = await getInventoryData();
    return formatInventoryData(inventoryData);
};

const formatSalesData = (data: any[]) => {
    return data.map(sale => ({
        id: sale.id,
        date: formatDate(sale.date),
        total: sale.total,
        items: sale.items,
    }));
};

const formatInventoryData = (data: any[]) => {
    return data.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
    }));
};