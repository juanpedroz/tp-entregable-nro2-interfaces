import { restaurarImagen } from './image.js';
import * as filtrosSimples from './filtroSimple.js';
import * as filtrosAvanzados from './filtroAvanzado.js';
import { imageData } from './image.js';
import { ctx } from './paint.js';

document.getElementById("btn-imageIni").addEventListener("click", () => restaurarImagen());


// --------------------------------------------------
// Comportamiento botones de filtros simples
// --------------------------------------------------

document.getElementById("btn-escalaGrises").addEventListener("click", () => filtrosSimples.escalaGrises(ctx, imageData));
document.getElementById("btn-negativo").addEventListener("click", () => filtrosSimples.negativo(ctx, imageData));
document.getElementById("btn-sepia").addEventListener("click", () => filtrosSimples.sepia(ctx, imageData));
document.getElementById("btn-binarizacion").addEventListener("click", () => filtrosSimples.binarizacion(ctx, imageData));

let btnBrillo = document.getElementById("btn-brillo");
btnBrillo.addEventListener("change", () => {
    if (!imageData){
        btnBrillo.value = 0;// tal vez sea mejor una constante
        return
    }
    restaurarImagen();
    filtrosSimples.brillo(ctx, imageData, btnBrillo.value);
});

document.getElementById("btn-r").addEventListener("click", () => filtrosSimples.red(ctx, imageData));
document.getElementById("btn-g").addEventListener("click", () => filtrosSimples.green(ctx, imageData));
document.getElementById("btn-b").addEventListener("click", () => filtrosSimples.blue(ctx, imageData));

// --------------------------------------------------
// Comportamiento botones de filtros avanzados
// --------------------------------------------------
let btnSaturacion = document.getElementById("btn-saturacion");
btnSaturacion.addEventListener("change", () => {
    if (!imageData){
        btnSaturacion.value = 1;// tal vez sea mejor una constante
        return
    }
    restaurarImagen();
    filtrosAvanzados.saturacion(ctx, imageData, btnSaturacion.value);
});
document.getElementById("btn-bordes").addEventListener("click", () => filtrosAvanzados.deteccionBordes(ctx, imageData));
document.getElementById("btn-blur").addEventListener("click", () => filtrosAvanzados.blur(ctx, imageData));
