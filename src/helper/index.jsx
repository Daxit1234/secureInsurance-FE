import { Workbook } from "exceljs";
import * as FileSaver from "file-saver";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

export const exportToExcel = async (
  json = [],
  excelFileName = "",
  headersArray = []
) => {
  const header = headersArray;
  const data = json;
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet(excelFileName);
  let headerRow = worksheet.addRow(header);
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "6fc055" },
    };
    cell.font = {
      color: { argb: "FFFFFF" },
      bold: true,
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  data.forEach((element) => {
    let eachRow = [];
    headersArray.forEach((headers) => {
      eachRow.push(element[headers]);
    });
    worksheet.addRow(eachRow);
  });
  worksheet.columns.forEach(function (column, i) {
    if (i !== 0) {
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        let columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    }
  });
  let currentTimeStamp = new Date().getTime();
  let fileName = `${excelFileName}_export_${currentTimeStamp}${EXCEL_EXTENSION}`;
  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: EXCEL_TYPE });
    FileSaver.saveAs(blob, fileName);

    // FileSaver.saveAs(`${blob}, ${excelFileName}_export_${new Date().getTime() + EXCEL_EXTENSION}`)
  });
};

export const filterSystemData = (data, section) => {
  return data.filter(item=> item.section===section)
}
