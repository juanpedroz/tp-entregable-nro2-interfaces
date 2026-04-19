
let cargaImagen = document.getElementById("cargaImagen");

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


