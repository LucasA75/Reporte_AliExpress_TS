import { Workbook } from "exceljs";
export function exportarExcel(workbook : Workbook) {
    workbook.xlsx.writeBuffer()
        .then((res: Buffer) => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            const date = new Date()
            link.href = url;
            link.setAttribute("download", `Reporte_Pedidos_Ali_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            console.log('Archivo Excel creado con éxito');
        })
        .catch(function (error) {
            console.log('Error al exportar el archivo Excel:', error);
        });
}