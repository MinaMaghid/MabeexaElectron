import bwipjs from 'bwip-js';

export const generateBarcode = async (text, type = 'code128') => {
    return bwipjs.toBuffer({
        bcid: type,
        text,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: 'center',
    });
};