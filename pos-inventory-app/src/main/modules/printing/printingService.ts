import { BrowserWindow } from 'electron';

export const printReceipt = async (htmlContent, printerName = '') => {
    const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
    await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    await win.webContents.executeJavaScript('window.print()');
    win.close();
    return true;
};

export const printA4 = async (htmlContent, printerName = '') => {
    const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
    await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    await win.webContents.print({ silent: false, printBackground: true, deviceName: printerName });
    win.close();
    return true;
};