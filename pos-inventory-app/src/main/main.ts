import { app, BrowserWindow, ipcMain } from 'electron';
import * as productService from './modules/products/productService';
import * as usersService from './modules/users/usersService';
import * as dashboardService from './modules/dashboard/dashboardService';
import * as posService from './modules/pos/posService';
import * as salesService from './modules/sales/salesService';
import * as returnsService from './modules/returns/returnsService';
import * as customersService from './modules/customers/customersService';
import * as suppliersService from './modules/suppliers/suppliersService';
import * as purchasesService from './modules/purchases/purchasesService';
import * as expensesService from './modules/expenses/expensesService';
import * as damagedService from './modules/damaged/damagedService';
import * as banksService from './modules/banks/banksService';
import * as settingsService from './modules/settings/settingsService';
import * as reportsService from './modules/reports/reportsService';
import * as backupService from './modules/backup/backupService';
import * as securityService from './modules/security/securityService';
import * as printingService from './modules/printing/printingService';
import * as packagesService from './modules/packages/packagesService';
import * as auditService from './modules/audit/auditService';
import * as importExportService from './modules/importExport/importExportService';
import * as barcodeService from './modules/barcode/barcodeService';
import { startAutoBackup } from './modules/backup/autoBackup';

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: __dirname + '/preload.js',
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

// Product IPC
ipcMain.handle('get-products', async () => await productService.getProducts());
ipcMain.handle('add-product', async (event, ...args) => await productService.addProduct(...args));
ipcMain.handle('update-product', async (event, ...args) => await productService.updateProduct(...args));
ipcMain.handle('delete-product', async (event, id) => await productService.deleteProduct(id));
ipcMain.handle('get-categories', async () => await productService.getCategories());
ipcMain.handle('add-category', async (event, name) => await productService.addCategory(name));

// User IPC
ipcMain.handle('add-user', async (event, ...args) => await usersService.addUser(...args));
ipcMain.handle('get-user-by-username', async (event, username) => await usersService.getUserByUsername(username));
ipcMain.handle('get-users', async () => await usersService.getUsers());
ipcMain.handle('delete-user', async (event, id) => await usersService.deleteUser(id));
ipcMain.handle('update-user-role', async (event, id, role) => await usersService.updateUserRole(id, role));
ipcMain.handle('verify-password', async (event, username, password) => await usersService.verifyPassword(username, password));

// Dashboard IPC
ipcMain.handle('get-dashboard-stats', async () => await dashboardService.getDashboardStats());

// POS IPC
ipcMain.handle('get-products-for-pos', async () => await posService.getProductsForPOS());
ipcMain.handle('get-customers', async () => await posService.getCustomers());
ipcMain.handle('add-sale', async (event, items, customerId, discount, paymentMethod) => await posService.addSale(items, customerId, discount, paymentMethod));

// Sales & Returns IPC
ipcMain.handle('get-sales', async (event, filters) => await salesService.getSales(filters));
ipcMain.handle('get-returns', async () => await returnsService.getReturns());
ipcMain.handle('process-return', async (event, saleId, productId, quantity, reason) => await returnsService.processReturn(saleId, productId, quantity, reason));

// Customers IPC
ipcMain.handle('add-customer', async (event, name, contact, address) => await customersService.addCustomer(name, contact, address));
ipcMain.handle('update-customer', async (event, id, name, contact, address) => await customersService.updateCustomer(id, name, contact, address));
ipcMain.handle('delete-customer', async (event, id) => await customersService.deleteCustomer(id));
ipcMain.handle('get-customers', async () => await customersService.getCustomers());
ipcMain.handle('get-customer-purchases', async (event, customerId) => await customersService.getCustomerPurchases(customerId));

// Suppliers IPC
ipcMain.handle('add-supplier', async (event, name, contact, address) => await suppliersService.addSupplier(name, contact, address));
ipcMain.handle('update-supplier', async (event, id, name, contact, address) => await suppliersService.updateSupplier(id, name, contact, address));
ipcMain.handle('delete-supplier', async (event, id) => await suppliersService.deleteSupplier(id));
ipcMain.handle('get-suppliers', async () => await suppliersService.getSuppliers());
ipcMain.handle('get-supplier-transactions', async (event, supplierId) => await suppliersService.getSupplierTransactions(supplierId));

// Purchases IPC
ipcMain.handle('add-purchase', async (event, supplierId, products, invoiceDate) => await purchasesService.addPurchase(supplierId, products, invoiceDate));
ipcMain.handle('get-purchases', async () => await purchasesService.getPurchases());

// Expenses IPC
ipcMain.handle('add-expense', async (event, amount, category, note, date) => await expensesService.addExpense(amount, category, note, date));
ipcMain.handle('get-expenses', async (event, filters) => await expensesService.getExpenses(filters));
ipcMain.handle('get-total-expenses', async () => await expensesService.getTotalExpenses());

// Damaged/Lost Items IPC
ipcMain.handle('add-damaged-item', async (event, productId, quantity, note, date) => await damagedService.addDamagedItem(productId, quantity, note, date));
ipcMain.handle('get-damaged-items', async () => await damagedService.getDamagedItems());

// Banks & e-Wallets IPC
ipcMain.handle('add-bank-account', async (event, name, type, balance) => await banksService.addBankAccount(name, type, balance));
ipcMain.handle('get-bank-accounts', async () => await banksService.getBankAccounts());
ipcMain.handle('add-transaction', async (event, accountId, amount, reference, date, direction) => await banksService.addTransaction(accountId, amount, reference, date, direction));
ipcMain.handle('get-transactions', async (event, accountId) => await banksService.getTransactions(accountId));

// Settings IPC
ipcMain.handle('get-settings', async () => await settingsService.getSettings());
ipcMain.handle('set-setting', async (event, key, value) => await settingsService.setSetting(key, value));

// Reports IPC
ipcMain.handle('get-sales-report', async (event, startDate, endDate) => await reportsService.getSalesReport(startDate, endDate));
ipcMain.handle('get-profit-loss-report', async (event, startDate, endDate) => await reportsService.getProfitLossReport(startDate, endDate));
ipcMain.handle('get-stock-report', async () => await reportsService.getStockReport());
ipcMain.handle('get-customer-balance', async (event, customerId) => await reportsService.getCustomerBalance(customerId));
ipcMain.handle('get-supplier-balance', async (event, supplierId) => await reportsService.getSupplierBalance(supplierId));

// Backup & Restore IPC
ipcMain.handle('create-backup', async () => await backupService.createBackup());
ipcMain.handle('restore-backup', async (event, backupFilePath) => await backupService.restoreBackup(backupFilePath));
ipcMain.handle('list-backups', async () => await backupService.listBackups());

// Security & Licensing IPC
ipcMain.handle('validate-license', async (event, licenseKey) => await securityService.validateLicense(licenseKey));
ipcMain.handle('get-license-status', async () => await securityService.getLicenseStatus());

// Printing IPC
ipcMain.handle('print-receipt', async (event, htmlContent, printerName) => await printingService.printReceipt(htmlContent, printerName));
ipcMain.handle('print-a4', async (event, htmlContent, printerName) => await printingService.printA4(htmlContent, printerName));

// Packages IPC
ipcMain.handle('add-package', async (event, name, items) => await packagesService.addPackage(name, items));
ipcMain.handle('get-packages', async () => await packagesService.getPackages());
ipcMain.handle('get-package-items', async (event, packageId) => await packagesService.getPackageItems(packageId));

// Audit Log IPC
ipcMain.handle('log-action', async (event, user, action, details) => await auditService.logAction(user, action, details));
ipcMain.handle('get-audit-logs', async () => await auditService.getAuditLogs());

// Import/Export IPC
ipcMain.handle('export-inventory-csv', async (event, filePath) => await importExportService.exportInventoryCSV(filePath));
ipcMain.handle('import-inventory-csv', async (event, filePath) => await importExportService.importInventoryCSV(filePath));

// Barcode IPC
ipcMain.handle('generate-barcode', async (event, text, type) => await barcodeService.generateBarcode(text, type));

// Start auto backup
startAutoBackup();