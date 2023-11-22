//import { exportarExcel } from "./toExcel";

// Contiene todos los nodos de item-order de una pagina
const elementoInput: HTMLInputElement | null = document.querySelector(".comet-checkbox-group");

interface Pedidos {
  fecha?:    string | null;
  estado?:   string | null;
  nombre?:   string | null;
  precio?:   string | null;
  cantidad?: string | null;
  url?:     string | null;
}

let object: Array<Pedidos> = []
if (elementoInput) {
  console.log(elementoInput.children)
  const items = elementoInput.children
  try {
    Array.from(items).forEach(element => {
      object.push({
        "fecha": element.querySelector("div.order-item-header > div.order-item-header-right > div > div:nth-child(1)")?.textContent ,
        "estado": element.querySelector(" div.order-item-header > div.order-item-header-status > span")?.textContent,
        "nombre": element.querySelector("div.order-item-content-body > div > div.order-item-content-info-name > a > span")?.textContent,
        "precio": element.querySelector("div.order-item-content-body > div > div.order-item-content-info-number > div")?.textContent,
        "cantidad": element.querySelector("div.order-item-content-body > div > div.order-item-content-info-number > span")?.textContent,
        "url":element.querySelector("#root > div.order-wrap > div.order-main > div.order-content > div > div:nth-child(1) > div.order-item-store > span > a")?.getAttribute("href"),
      })
    }
    )
    console.log(object)
    //exportarExcel(object)

  } catch (error) {
    console.log(error)
  }
} else {
  console.error("Elemento no encontrado");
}
