import { Pedidos } from "./Interface/Orders";

//import { exportarExcel } from "./toExcel";
const elementoInput: HTMLInputElement | null = document.querySelector(".comet-checkbox-group");

async function getOrdersAli() {
console.log("Holis")
const object: Array<Pedidos> = []
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
  return new Promise((resolve, reject) => {
    resolve(object)
   })
  //exportarExcel(object)
  
} catch (error) {
  console.log(error)
}
} else {
console.error("Elemento no encontrado");
}
}