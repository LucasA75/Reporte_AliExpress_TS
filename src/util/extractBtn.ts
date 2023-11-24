import { createExcel } from "./createExcel";
import { exportarExcel } from "./exportExcel";
import { getInfoAli } from "./getInfoAli";

export const extractBtn =()=> {
    chrome.tabs.query({ active: true, currentWindow: true, },(tabs) => {
      const adress = tabs[0].url;
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
          const excel = createExcel(resultado)
          exportarExcel(excel);
        }).catch((err) => {
          console.log("Error al ejecutar obtenerInformacion:", err);
        }).catch((err) => {
          console.log("Error al ejecutar infoOrder.js:", err);
        });
      }
    });
  }