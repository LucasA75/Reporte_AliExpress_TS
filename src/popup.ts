import { Workbook } from 'exceljs';
import '../styles/popup.scss';
import { Pedidos } from './Interface/Pedidos';
import { getInfoAli } from './util/getInfoAli';
import { extractBtn } from './util/extractBtn';

document.getElementById('btnScraping').addEventListener('click', extractBtn);
document.getElementById('go-to-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});




