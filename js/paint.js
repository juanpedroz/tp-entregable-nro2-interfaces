import * as FiltrosSimples from './filtroSimple.js';
import { imageData } from './image.js'; 
import { Pen } from './pen.js';

// --------------------------------------------------
// Programa principal
// --------------------------------------------------

export const canvas = document.getElementById("lienzo");
export const ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let btnBorrarCanvas = document.getElementById("btn-borrar-canvas");

let nroColor = document.getElementById("nroColor"); // Valor de color del input de rango
let grosorLapiz = document.getElementById("grosor-lapiz"); // Grosor lápiz
let grosorGoma = document.getElementById("grosor-goma"); // Grosor goma


// --------------------------------------------------
// comportamiento del mouse
// --------------------------------------------------
let mouseDown = false;
let pencilClicked = false;

let color = "#000000";
let estilo = 5;

let miLapiz = null;

canvas.addEventListener("mousedown", function (e) {
    mouseDown = true;
    if (pencilClicked) {
        let posX = e.offsetX;
        let posY = e.offsetY;
        miLapiz = new Pen(posX, posY, color, estilo);
        miLapiz.draw(ctx);
    }
}); // mousedown

canvas.addEventListener("mousemove", function (e) {
    if (mouseDown && pencilClicked && miLapiz != null) {
        let posX = e.offsetX;
        let posY = e.offsetY;
        miLapiz.moveTo(posX, posY);
        miLapiz.draw(ctx);
    }   
}); // mousemove

canvas.addEventListener("mouseup", function (e) {
    mouseDown = false;
}); // mouseup

// --------------------------------------------------
// comportamiento de los botones
// --------------------------------------------------
let botonLapiz = document.getElementById("btn-lapiz");
let botonGoma = document.getElementById("btn-goma");

botonLapiz.addEventListener("click", function () { // click sobre botón lápiz
    pencilClicked = true;
    color = nroColor.value;
    estilo = grosorLapiz.value;
});

botonGoma.addEventListener("click", function () { // click sobre botón goma
    pencilClicked = true;
    color = "white";
    estilo = grosorGoma.value;
});

btnBorrarCanvas.addEventListener("click", () => limpiarCanvas());

function limpiarCanvas(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

document.getElementById("btn-guardar").addEventListener("click", () => {
    
    const dataURL = canvas.toDataURL("image/png"); //Convertir el canvas a una URL de imagen (formato PNG por defecto)
      
    const enlace = document.createElement("a"); //Crear un elemento <a> temporal
    enlace.href = dataURL;
    enlace.download = "mi-dibujo.png"; // Nombre del archivo al descargar
        
    enlace.click();//Simular el clic y eliminar el elemento
});


function main() {
    
}
