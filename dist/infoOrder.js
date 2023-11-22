"use strict";
// Contiene todos los nodos de item-order de una pagina
const elementoInput = document.querySelector(".comet-checkbox-group");
if (elementoInput) {
    console.log(elementoInput.children);
    const items = elementoInput.children;
    Array.from(items).forEach(element => element.querySelector("div.order-item-header > div.order-item-header-right > div > div:nth-child(1)"));
}
else {
    console.error("Elemento no encontrado");
}
