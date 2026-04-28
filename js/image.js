import { ctx } from './paint.js';

export let imageData;
export const img = new Image();
export let imageDataOriginal;

let cargaImagen = document.getElementById("cargaImagen");


// --------------------------------------------------
// Manejo de imagen
// --------------------------------------------------

cargaImagen.addEventListener("change", function (e) {
    const archivo = e.target.files[0]; // Obtiene el archivo seleccionado
    if (!archivo) return; // Sentencia de control
    const lector = new FileReader()
    lector.onload = (evento) => {
        img.src = evento.target.result; // Pasa la URL base64 de la imagen
    }
    lector.readAsDataURL(archivo); // Lee el archivo como URL
});

img.onload = () => { //Cargo imageData
    ctx.drawImage(img, 0, 0, img.width, img.height);
    imageData = ctx.getImageData(0, 0, img.width, img.height);
    imageDataOriginal = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
};

export function restaurarImagen (){
    if (!imageDataOriginal) return;
    imageData.data.set(imageDataOriginal.data);
    // Dibujo la imagen limpia en el canvas
    ctx.putImageData(imageData, 0, 0);
}


