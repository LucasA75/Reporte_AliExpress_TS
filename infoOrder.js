// Contiene todos los nodos de item-order de una pagina
var elementoInput = document.querySelector(".comet-checkbox-group");
if (elementoInput) {
    console.log(elementoInput.children);
    var items = elementoInput.children;
    Array.from(items).forEach(function (elements) { return console.log(elements); });
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
