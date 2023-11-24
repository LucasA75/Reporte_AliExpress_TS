import { Workbook } from 'exceljs';
import '../styles/popup.scss';
import { Pedidos } from './Interface/Pedidos';


function getInfoAli() {
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
          "url": element.querySelector("#root > div.order-wrap > div.order-main > div.order-content > div > div:nth-child(1) > div.order-item-store > span > a")?.getAttribute("href"),
        })
      }
      )
      return new Promise((resolve, reject) => {
        resolve(object)
      })

    } catch (error) {
      console.log(error)
    }
  } else {
    console.error("Elemento no encontrado");
  }
}

function extractBtn() {
  chrome.tabs.query({ active: true, currentWindow: true, }, function (tabs) {
    console.log(tabs)
    const adress = tabs[0].url;
    console.log(adress)
    const url = adress!.split('/')[2]
    if (!url.includes('aliexpress')) {
      alert("It can only work in aliexpress :(")
      close()
    }
    else {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        func: () => getInfoAli()
      }).then((resultado) => {
        exportarExcel(resultado)
      }).catch((err) => {
        console.log("Error al ejecutar obtenerInformacion:", err);
      }).catch((err) => {
        console.log("Error al ejecutar infoOrder.js:", err);
      });
    }
  });
}

document.getElementById('btnScraping').addEventListener('click', extractBtn);

document.getElementById('go-to-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});
function exportarExcel(resultado: chrome.scripting.InjectionResult<unknown>[]) {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Datos');
  const pedidosArray = Array.from(resultado[0].result as Array<Pedidos>);
  const arrayKeys = Object.keys(pedidosArray.map(e => e)[0])
  console.log(arrayKeys)

  const columnas : any= []
  arrayKeys.map(e => 
    columnas.push({header: e, key:e, width:15}))
  // Agregar las columnas a la hoja de cálculo
  worksheet.columns = columnas
pedidosArray.map(e => 
  worksheet.addRow(Object.values(e))
  )

  console.log(worksheet)
  // Guardar el archivo Excel
  const ex = workbook.xlsx.writeBuffer()
    .then(function (res: Buffer) {
      console.log(res)
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      console.log(url)
      link.href = url;
      link.setAttribute("download", `F-RFI-V.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      console.log('Archivo Excel creado con éxito');
    })
    .catch(function (error) {
      console.log('Error al crear el archivo Excel:', error);
    });
}

