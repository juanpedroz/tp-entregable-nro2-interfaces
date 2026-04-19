
let cargaImagen = document.getElementById("cargaImagen");

let btnImageIni = document.getElementById("btn-imageIni");
let btnEscalaGrises = document.getElementById("btn-escalaGrises");
let btnNegativo = document.getElementById("btn-negativo");
let btnSepia = document.getElementById("btn-sepia");
let btnBinarizacion = document.getElementById("btn-binarizacion");


let imageData;
let data;
let img = new Image();

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
    imageData = ctx.getImageData(0, 0, img.width, img.height); // Obtengo imagen
    data = imageData.data; // Obtengo arreglo de pixeles
};


// --------------------------------------------------
// Comportamiento de los botones
// --------------------------------------------------

btnImageIni.addEventListener("click", function () {

    if (!data) return
    imageData.data = data;
    ctx.putImageData(imageData, 0, 0);

});

btnEscalaGrises.addEventListener("click", function () {

    if (!data) return // Sentencia de control
    let auxData = data; // Utilizo estructura auxiliar para mantener imagen original
    for (let i = 0; i < auxData.length; i += 4) {
        const promedio = (auxData[i] + auxData[i + 1] + auxData[i + 2]) / 3;
        //Obtuve los valores iniciales y se setearon los nuevos
        auxData[i] = promedio; // Rojo
        auxData[i + 1] = promedio; // Verde
        auxData[i + 2] = promedio; // Azul
    }

    imageData.data = auxData; // Actualizo arreglo de pixeles

    ctx.putImageData(imageData, 0, 0); // Actualizo canvas

});

btnSepia.addEventListener("click", function () {

    if (!data) return // Sentencia de control
    let auxData = data; // Utilizo estructura auxiliar para mantener imagen original

    for (let i = 0; i < auxData.length; i += 4) {
        const r = auxData[i], g = auxData[i + 1], b = auxData[i + 2];
        auxData[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // Rojo
        auxData[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // Verde
        auxData[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // Azul
    }

    imageData.data = auxData; // Actualizo arreglo de pixeles

    ctx.putImageData(imageData, 0, 0); // Actualizo canvas

});

btnNegativo.addEventListener("click", function () {

    if (!data) return // Sentencia de control
    let auxData = data; // Utilizo estructura auxiliar para mantener imagen original
    for (let i = 0; i < auxData.length; i += 4) {
        auxData[i] = 255 - auxData[i];     // R
        auxData[i + 1] = 255 - auxData[i + 1]; // G
        auxData[i + 2] = 255 - auxData[i + 2]; // B
    }

    imageData.data = auxData; // Actualizo arreglo de pixeles

    ctx.putImageData(imageData, 0, 0); // Actualizo canvas
});

btnBinarizacion.addEventListener("click", function () {

    if (!data) return
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

    imageData.data = data; 

    ctx.putImageData(imageData, 0, 0);
});

