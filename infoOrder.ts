// Contiene todos los nodos de item-order de una pagina
const elementoInput: HTMLInputElement | null = document.querySelector(".comet-checkbox-group");

if (elementoInput) {
  console.log(elementoInput.children)
  const items = elementoInput.children
  Array.from(items).forEach(elements => console.log(elements))
} else {
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