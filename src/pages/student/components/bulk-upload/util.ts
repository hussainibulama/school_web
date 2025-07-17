import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const generateStudentTemplate = () => {
  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'gender', label: 'Gender' },
    { key: 'address', label: 'Address' },
    { key: 'dob', label: 'Date of Birth' },
  ];

  const sampleRow = {
    firstName: 'John',
    middleName: 'A',
    lastName: 'Doe',
    phone: '08012345678',
    gender: 'm',
    address: '123 Sample St',
    dob: '1990-02-03',
  };

  // Prepare data: title, header, sample
  const title = [['Student Bulk Upload']];
  const headers = [columns.map((col) => col.label)];
  const sample = [columns.map((col) => sampleRow[col.key as keyof typeof sampleRow])];
  const sheetData = [...title, ...headers, ...sample];

  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  // Apply styles (optional, without protection)
  const headerStyle = {
    fill: { fgColor: { rgb: 'CCE5FF' } },
    font: { bold: true },
    alignment: { horizontal: 'center' },
  };

  const titleStyle = {
    font: { bold: true, sz: 14 },
    alignment: { horizontal: 'center' },
  };

  const totalCols = columns.length;
  for (let c = 0; c < totalCols; c++) {
    const headerCell = XLSX.utils.encode_cell({ r: 1, c });
    if (ws[headerCell]) {
      ws[headerCell].s = headerStyle;
    }

    const titleCell = XLSX.utils.encode_cell({ r: 0, c });
    if (ws[titleCell]) {
      ws[titleCell].s = titleStyle;
    }
  }

  // Set column width and freeze header
  ws['!cols'] = columns.map(() => ({ wch: 20 }));
  ws['!freeze'] = { xSplit: 0, ySplit: 2 };

  // 🔥 REMOVE SHEET PROTECTION
  delete ws['!protect']; // optional, but safe to explicitly remove

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Students');

  const buf = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array',
    cellStyles: true,
  });

  saveAs(
    new Blob([buf], { type: 'application/octet-stream' }),
    'student_bulk_upload_template.xlsx',
  );
};
