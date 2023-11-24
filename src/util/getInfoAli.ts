import { Pedidos } from "../Interface/Pedidos";

export const getInfoAli = ()=> {
    const elementoInput: HTMLInputElement | null = document.querySelector(".comet-checkbox-group");
    const object: Array<Pedidos> = []
    if (elementoInput) {
      console.log(elementoInput.children)
      const items = elementoInput.children
      try {
        Array.from(items).forEach(element => {
          object.push({
            "fecha": element.querySelector("div.order-item-header > div.order-item-header-right > div > div:nth-child(1)")?.textContent,
            "estado": element.querySelector(" div.order-item-header > div.order-item-header-status > span")?.textContent,
            "nombre": element.querySelector("div.order-item-content-body > div > div.order-item-content-info-name > a > span")?.textContent,
            "precio": element.querySelector("div.order-item-content-body > div > div.order-item-content-info-number > div")?.textContent,
            "cantidad": element.querySelector("div.order-item-content-body > div > div.order-item-content-info-number > span")?.textContent,
            "url": element.querySelector(" div.order-item-store > span > a")?.getAttribute("href"),
          })
        }
        )
        return new Promise((resolve) => {
          resolve(object)
        })
  
      } catch (error) {
        console.log(error)
      }
    } else {
      console.error("Elemento no encontrado");
    }
  }