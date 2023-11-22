// Contiene todos los nodos de item-order de una pagina
const elementoInput: HTMLInputElement | null = document.querySelector(".comet-checkbox-group");

if (elementoInput) {
  console.log(elementoInput.children)
  const items = elementoInput.children
  Array.from(items).forEach(elements => console.log(elements))
} else {
  console.error("Elemento no encontrado");
}