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
      cantidad: Number(e.cantidad.replace('x', '')),
      estado: e.estado,
      fecha: e.fecha.replace('Pedido efectuado el:', ''),
      nombre: e.nombre,
      precio: Number(e.precio.replace(/\D/g, '')),
      url: e.url.replace('//', ''),
      urlImagen : e.urlImagen.match(/https:\/\/[^'")]*/)[0].replace("_220x220.jpg","")
    }
    table ?
    arrayDeValores.push(Object.values(objEdit))
    :
    worksheet.columns =  arrayKeys.map((e) => ({ header: e, key: e, width: 20 }));
    worksheet.addRow(objEdit).height = 50;
})

for(let i = 2; i < pedidosArray.length + 2; i++){
    const rowData = worksheet.getCell(`G${i}`)
    rowData.value = {formula: `=IMAGEN("${worksheet.getCell(`G${i}`).value}")`}
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
          arrayDeValores.map((e)=>e) 
        ,
      })

      worksheet.unprotect()
  return workbook
};
