import { restaurarImagen } from './image.js';

// --------------------------------------------------
// Funciones de filtros simples
// --------------------------------------------------

export function escalaGrises(ctx, imageData) {
    if (!imageData) return;
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const promedio = (data[i] + data[i + 1] + data[i + 2]) / 3;
        //Obtuve los valores iniciales y se setearon los nuevos
        data[i] = promedio; // Rojo
        data[i + 1] = promedio; // Verde
        data[i + 2] = promedio; // Azul
    }
    ctx.putImageData(imageData, 0, 0); // Actualizo canvas
}

export function sepia(ctx, imageData) {
    if (!imageData) return;
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // Rojo
        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // Verde
        data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // Azul
    }
    ctx.putImageData(imageData, 0, 0); // Actualizo canvas
}

export function negativo(ctx, imageData) {
    if (!imageData) return;
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
    }
    ctx.putImageData(imageData, 0, 0); // Actualizo canvas
}

export function binarizacion(ctx, imageData) {
    if (!imageData) return;
    let data = imageData.data;
    let umbral = 128; // defino el limite entre 0 y 1
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Calculo prom escala de grises
        let valor;
        if (avg >= umbral) { // Aplico binarización
            valor = 255;
        } else {
            valor = 0;
        }
        data[i] = valor;     // R
        data[i + 1] = valor; // G
        data[i + 2] = valor; // B
    }
    ctx.putImageData(imageData, 0, 0);
}

export function brillo(ctx, imageData, valorBrillo) {
    const spanBrillo = document.getElementById("valorBrillo");
    if (!imageData) return;
    let data = imageData.data;
    let brillo = 1 + (parseInt(valorBrillo) / 100);
    spanBrillo.textContent = valorBrillo;
    for (let i = 0; i < data.length; i += 4) {
        data[i] *= brillo;     // R
        data[i + 1] *= brillo; // G
        data[i + 2] *= brillo; // B
    }
    ctx.putImageData(imageData, 0, 0);
}

export function red(ctx, imageData) {
    if (!imageData) return;
    restaurarImagen();
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        //data[i] = data[i];// R
        data[i + 1] = 0; // G
        data[i + 2] = 0; // B
    }
    ctx.putImageData(imageData, 0, 0);
}

export function green(ctx, imageData) {
    if (!imageData) return;
    restaurarImagen();
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 0;// R
        //data[i + 1] = data[i + 1] // G
        data[i + 2] = 0; // B
    }
    ctx.putImageData(imageData, 0, 0);
}

export function blue(ctx, imageData) {
    if (!imageData) return;
    restaurarImagen();
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 0;// R
        data[i + 1] = 0; // G
        //data[i + 2] = 0; // B
    }
    ctx.putImageData(imageData, 0, 0);
}

export function comic(ctx, imageData, niveles) {
    if (!imageData) return;
    restaurarImagen();
    let data = imageData.data;
    // 'niveles' puede ser un valor entre 2 y 15)
    for (let i = 0; i < data.length; i += 4) {
        // Aplicamos la fórmula a cada canal de color
        data[i] = Math.floor(data[i] / (256 / niveles)) * (255 / (niveles - 1)); // R
        data[i + 1] = Math.floor(data[i + 1] / (256 / niveles)) * (255 / (niveles - 1)); // G
        data[i + 2] = Math.floor(data[i + 2] / (256 / niveles)) * (255 / (niveles - 1)); // B
    }
    ctx.putImageData(imageData, 0, 0);

}