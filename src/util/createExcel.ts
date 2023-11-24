import { Workbook } from 'exceljs';
import { Pedidos } from '../Interface/Pedidos';

export const createExcel = (
  resultado: chrome.scripting.InjectionResult<unknown>[],
) : Workbook=> {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Datos');
  const pedidosArray = Array.from(resultado[0].result as Array<Pedidos>);
  const arrayKeys = Object.keys(pedidosArray.map((e) => e)[0]);
  worksheet.columns =  arrayKeys.map((e) => ({ header: e, key: e, width: 20 }));
  pedidosArray.map((e) => {
    const objEdit = {
      cantidad: Number(e.cantidad.replace('x', '')),
      estado: e.estado,
      fecha: e.fecha.replace('Pedido efectuado el:', ''),
      nombre: e.nombre,
      precio: Number(e.precio.replace(/\D/g, '')),
      url: e.url.replace('//', ''),
    };
    worksheet.addRow(objEdit);
  });
  return workbook
};
