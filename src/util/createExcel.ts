import { Workbook } from 'exceljs';
import { Pedidos } from '../Interface/Pedidos';

export const createExcel = (
  resultado: chrome.scripting.InjectionResult<unknown>[],
  table? : boolean
) : Workbook=> {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Datos');
  const pedidosArray = Array.from(resultado[0].result as Array<Pedidos>);
  const arrayKeys = Object.keys(pedidosArray.map((e) => e)[0]);
  const arrayDeValores : Array<any> = []
    pedidosArray.map((e : Pedidos) => {
    const objEdit = {
      cantidad: e.cantidad,
      estado: e.estado,
      fecha: e.fecha,
      nombre: e.nombre,
      precioUni: e.precioUni,
      precioTotal:e.precioTotal,
      url: e.url,
      urlImagen : e.urlImagen,
    }
    table &&
    arrayDeValores.push(Object.values(objEdit))
  })
  worksheet.columns =  arrayKeys.map((e) => ({ header: e, key: e, width: 20 }));
  pedidosArray.map(e => worksheet.addRow(e).height = 45)
  
for(let i = 2; i < pedidosArray.length + 2; i++){
    const rowData = worksheet.getCell(`H${i}`)
    rowData.value = {formula: `=IMAGEN("${worksheet.getCell(`H${i}`).value}")`}
    rowData.alignment = { vertical: 'middle', horizontal: 'center' }
}

    table &&
    worksheet.addTable({
        name: 'MyTable',
        ref: 'A1',
        headerRow: true,
        totalsRow: true,
        style: {
          theme: 'TableStyleLight1',
          showRowStripes: true,
        },
        columns: 
            arrayKeys.map((e) => ({ name: e, totalsRowFunction:'sum', width: 20, filterButton:true}))
        ,
        rows: 
        pedidosArray.map(e => Object.values(e))
        ,
      })

      worksheet.unprotect()
  return workbook
};
