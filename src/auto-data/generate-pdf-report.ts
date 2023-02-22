import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { logger } from 'src/config/logger';
import { IAnyObject } from 'src/interfaces/response.interface';


function checkIfArrayContainsObjects({ data }: { data: Array<any>; }): boolean {
    if (Array.isArray(data)) {
      if (typeof data[0] === 'object') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

function checkIfArrayLengthIsOne({ data }: { data: any; }): boolean {
    return Array.isArray(data) && data.length === 1;
  }

  function buildHeader({ data }: { data: Array<any>; }): string[] {
    const columnSet = new Set<string>();
    if (!checkIfArrayContainsObjects({ data })) {
      return [];
    }
    data.forEach((column) => {
      //set column type to avoid type errors
      Object.keys(column).forEach((key: string) => columnSet.add(key));
    });
    return Array.from(columnSet);
  }

  function getSimplifiedRow({ row }: { row: any; }): any {
    let stringifiedRow;
    if (typeof row == 'object') {
      if (!checkIfArrayContainsObjects({ data: row })) {
        //if array has only strings then we will show a string
        stringifiedRow = row.toString();
      } else {
        stringifiedRow = JSON.stringify(
          checkIfArrayLengthIsOne({ data: row }) ? row[0] : row,
        );
      }
    } else {
      stringifiedRow = row;
    }
    return stringifiedRow ? stringifiedRow : '';
  }

  function buildBody({ data }: { data: Array<any>; }): string[][] {
    const res = [];
    let row: Array<any> = [];
    const table_columns = buildHeader({ data });
    const isArrayOfObjects = checkIfArrayContainsObjects({ data });
    if (isArrayOfObjects) {
      data.forEach((header) => {
        table_columns.forEach((col) => {
          row.push(getSimplifiedRow({ row: header[col] }));
        });
        res.push(row);
        row = [];
      });
    } else {
      //if body has only one string in one row
      row = data.map((d) => [d]);
      res.push(row);
    }
    return res;
  }

  function getOverallDetailsTableBody({ data }: { data: IAnyObject; }): any[] {
    const rows = [];
    for (const key in data) {
      if (typeof data[key] !== 'object') {
        rows.push([key, data[key]]);
      }
    }
    return rows;
  }

   function getTableHeaders({ data }: { data: IAnyObject; }): any[] {
    const rows = [];
    for (const key in data) {
      if (typeof data[key] === 'object') {
        rows.push(key);
      }
    }
    return rows;
  }
  
  export function generatePdf({ data, pdfHeading = 'Report' }: { data: IAnyObject; pdfHeading?: string; }): string {
    const doc = new jsPDF({ orientation: 'landscape' });
      logger.log('Generating pdf !!');
      autoTable(doc, {
        head: [
          [{ content: pdfHeading.toUpperCase(), styles: { fillColor: 'green' } }],
        ],
      });
      autoTable(doc, {
        body: getOverallDetailsTableBody({ data }),
      });
      const headers = getTableHeaders({ data });
      for (let i = 0; i < headers.length; i++) {
        const styles: IAnyObject = {
          overflow: 'linebreak',
          cellPadding: 1,
          fontSize: 5,
        };
        let columnStyles;
        const table_headers = buildHeader({ data: data[headers[i]] });
        if (table_headers.length < 10) {
          styles.fontSize = 6;
          styles.cellWidth = 'wrap';
        } else {
          columnStyles = {
            0: { cellWidth: 20 },
            1: { cellWidth: 20 },
            2: { cellWidth: 20 },
            3: { cellWidth: 20 },
            4: { cellWidth: 20 },
            5: { cellWidth: 20 },
            6: { cellWidth: 20 },
            7: { cellWidth: 20 },
            8: { cellWidth: 20 },
            9: { cellWidth: 20 },
          };
        }
        autoTable(doc, {
          head: [
            [
              {
                content: headers[i].toUpperCase(),
                styles: { fillColor: 'green' },
              },
            ],
          ],
        });
        autoTable(doc, {
          head: table_headers.length > 0 ? [table_headers] : undefined,
          body: buildBody({ data: data[headers[i]] }),
          styles,
          columnStyles: columnStyles
            ? columnStyles
            : { text: { cellWidth: 'auto' } },
        });
      }
      return doc.output();
    
}
