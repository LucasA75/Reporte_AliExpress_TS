import { Pedidos } from './interface/Pedidos';
import * as ex from "exceljs"

export const exportarExcel = (info : Array<Pedidos> ): void =>{
    
    const workBook = new ex.Workbook()
    const worksheet = workBook.addWorksheet('Hoja1');
    workBook.created = new Date()

    const headers = Object.keys(info[0]);
    console.log(headers)
    worksheet.addRow(headers);  
    // Agrega los datos a la hoja de trabajo
/*     info.forEach((data) => {
      const row: any = [];
      headers.forEach((header) => {
        row.push(data[header]);
      });
      worksheet.addRow(row);
    });
     */
    // Guarda el libro de Excel en un archivo
/*     const excelFileName = 'output.xlsx';
    workbook.xlsx.writeFile(excelFileName)
      .then(() => {
        console.log(`El archivo ${excelFileName} ha sido creado exitosamente.`);
      })
      .catch((error) => {
        console.error('Error al crear el archivo Excel:', error);
      }); */
}