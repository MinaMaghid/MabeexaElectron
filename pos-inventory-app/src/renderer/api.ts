export const apiCall = async (method, ...args) => {
    try {
        return await window.api[method](...args);
    } catch (err) {
        throw new Error(err.message || 'API Error');
    }
};