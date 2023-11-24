import { Workbook } from 'exceljs';
import '../styles/popup.scss';
import { Pedidos } from './Interface/Pedidos';
import { getInfoAli } from './util/getInfoAli';
import { extractBtn } from './util/extractBtn';

let checkboxTable = false
const checkTablebox = document.querySelector('#table')
  checkTablebox.addEventListener('change', ()=>{
    checkboxTable = !checkboxTable
});
document.getElementById('btnScraping').addEventListener('click', () => extractBtn(checkboxTable));
document.getElementById('go-to-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});




