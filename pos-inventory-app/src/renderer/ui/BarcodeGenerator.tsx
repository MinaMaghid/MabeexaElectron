import React, { useState } from 'react';
import { toCanvas } from 'bwip-js';

const BarcodeGenerator = () => {
    const [barcode, setBarcode] = useState('');
    const canvasRef = React.useRef(null);

    const handleGenerate = () => {
        if (canvasRef.current && barcode) {
            toCanvas(canvasRef.current, {
                bcid:        'code128',       // Barcode type
                text:        barcode,         // Text to encode
                scale:       3,               // 3x scaling factor
                height:      10,              // Bar height, in mm
                includetext: true,            // Show human-readable text
                textxalign:  'center',        // Always good to set this
            });
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Barcode Generator</h1>
            <input
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
                placeholder="Enter barcode value"
                className="input mb-2"
            />
            <button className="btn mb-2" onClick={handleGenerate}>Generate</button>
            <canvas ref={canvasRef} className="mt-4" />
        </div>
    );
};

export default BarcodeGenerator;