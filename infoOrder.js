
console.log("Holasasdjasjd")
var elementoInput = document.querySelector("#APjFqb");
if (elementoInput) {
    elementoInput.value = "Aliexpress";
}
else {
    console.error("Elemento no encontrado");
}
//Creamos el evento click
var evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
});
//Si no se cancela el evento lo ejecutamos
var canceled = !document.querySelector('input[name="btnK"]').dispatchEvent(evt);
