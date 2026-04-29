// --------------------------------------------------
// Funciones de filtros avanzados
// --------------------------------------------------

export function saturacion(ctx, imageData, nivel) {
    if (!imageData) return;
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const gris = 0.299 * r + 0.587 * g + 0.114 * b;

        data[i] = gris + nivel * (r - gris);
        data[i + 1] = gris + nivel * (g - gris);
        data[i + 2] = gris + nivel * (b - gris);
    }
    ctx.putImageData(imageData, 0, 0);
}

export function deteccionBordes(ctx, imageData) {
    if (!imageData) return;
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const copia = new Uint8ClampedArray(data);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const derecha = (y * width + (x + 1)) * 4;
            const abajo = ((y + 1) * width + x) * 4;

            if (x < width - 1 && y < height - 1) {
                // Calculamos la diferencia de brillo con el vecino derecho y el inferior
                const diffR = Math.abs(copia[i] - copia[derecha]) + Math.abs(copia[i] - copia[abajo]);
                const diffG = Math.abs(copia[i+1] - copia[derecha+1]) + Math.abs(copia[i+1] - copia[abajo+1]);
                const diffB = Math.abs(copia[i+2] - copia[derecha+2]) + Math.abs(copia[i+2] - copia[abajo+2]);
                
                const total = (diffR + diffG + diffB) / 3;
                data[i] = data[i+1] = data[i+2] = total;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

export function blur(ctx, imageData) {
    if (!imageData) return;
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Creamos una copia de los píxeles originales para leer de ahí
    const copia = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let r = 0, g = 0, b = 0;
            
            // Recorremos una matriz de 3x3 alrededor del píxel
            for (let sy = -1; sy <= 1; sy++) {
                for (let sx = -1; sx <= 1; sx++) {
                    const i = ((y + sy) * width + (x + sx)) * 4;
                    r += copia[i];
                    g += copia[i + 1];
                    b += copia[i + 2];
                }
            }
            
            const pixelActual = (y * width + x) * 4;
            data[pixelActual] = r / 9;     // Promedio Rojo
            data[pixelActual + 1] = g / 9; // Promedio Verde
            data[pixelActual + 2] = b / 9; // Promedio Azul
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

