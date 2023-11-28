import { Workbook } from 'exceljs';
import { Orders } from '../Interface/Orders';

export const createExcel = (
  result: chrome.scripting.InjectionResult<unknown>[],
  table?: boolean,
): Workbook => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Datos');
  const orders = Array.from(result[0].result as Array<Orders>);
  const ordersKeys = Object.keys(orders.map((e) => e)[0]);

  table
    ? worksheet.addTable({
        name: 'MyTable',
        ref: 'A1',
        headerRow: true,
        totalsRow: true,
        style: {
          theme: 'TableStyleLight1',
          showRowStripes: true,
        },
        columns: ordersKeys.map((e) => ({
          name: e,
          totalsRowFunction: 'sum',
          width: 20,
          filterButton: true,
        })),
        rows: orders.map((e) => Object.values(e)),
      })
    : (worksheet.columns = ordersKeys.map((e) => ({
        header: e,
        key: e,
        width: 20,
      })));
  orders.map((e) => (worksheet.addRow(e).height = 45));
  for (let i = 2; i < orders.length + 2; i++) {
    const rowData = worksheet.getCell(`H${i}`);
    rowData.value = {
      formula: `=IMAGEN("${worksheet.getCell(`H${i}`).value}")`,
    };
    rowData.alignment = { vertical: 'middle', horizontal: 'center' };
  }

  worksheet.unprotect();
  return workbook;
};
