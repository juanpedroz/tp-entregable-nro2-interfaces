
let cargaImagen = document.getElementById("cargaImagen");



let btnEscalaGrises = document.getElementById("btn-escalaGrises");
let btnNegativo = document.getElementById("btn-negativo");
let btnSepia = document.getElementById("btn-sepia");
let btnBinarizacion = document.getElementById("btn-binarizacion")

let imageData;
let img = new Image();

// 

cargaImagen.addEventListener("change", function (e) {
    const archivo = e.target.files[0]; // Obtiene el archivo seleccionado
    if (!archivo) return; // Sentencia de control

    const lector = new FileReader();

    lector.onload = (evento) => {

        img.src = evento.target.result; // Pasa la URL base64 de la imagen
    }

    lector.readAsDataURL(archivo); // Lee el archivo como URL
});

img.onload = () => {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    imageData = ctx.getImageData(0, 0, img.width, img.height);
};


// --------------------------------------------------
// comportamiento de los botones
// --------------------------------------------------

btnEscalaGrises.addEventListener("click", function (e) {
    if (!imageData) return // Sentencia de control

    const data = imageData.data; // Obtengo arreglo de pixeles

    for (let i = 0; i < data.length; i += 4) {
        const promedio = (data[i] + data[i + 1] + data[i + 2]) / 3;
        //Obtuve los valores iniciales y se setearon los nuevos
        data[i] = promedio; // Rojo
        data[i + 1] = promedio; // Verde
        data[i + 2] = promedio; // Azul
    }

    imageData.data = data; // Actualizo arreglo de pixeles

    ctx.putImageData(imageData, 0, 0); // Actualizo canvas

});

btnSepia.addEventListener("click", function () {
    if (!imageData) return // Sentencia de control

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // Rojo
        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // Verde
        data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // Azul
    }

    imageData.data = data; // Actualizo arreglo de pixeles

    ctx.putImageData(imageData, 0, 0); // Actualizo canvas

});

btnNegativo.addEventListener("click", function () {
    if (!imageData) return // Sentencia de control

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // R
        data[i + 1] = 255 - data[i + 1]; // G
        data[i + 2] = 255 - data[i + 2]; // B
    }

    imageData.data = data; // Actualizo arreglo de pixeles

    ctx.putImageData(imageData, 0, 0); // Actualizo canvas
});

