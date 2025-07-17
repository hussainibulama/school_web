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
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Password' },
    { key: 'role', label: 'Role' },
  ];

  const sampleRow = {
    firstName: 'John',
    middleName: 'A',
    lastName: 'Doe',
    phone: '08012345678',
    gender: 'm',
    address: '123 Sample St',
    dob: '1990-02-03',
    email: 'johndoe@gmail.com',
    password: '123456',
    role: 'teacher',
  };

  const ws: XLSX.WorkSheet = {};
  const title = 'Staff Bulk Upload — Remember: Role is either `proprietor`, `teacher`, or `admin`';

  // Row 0: Title (only first column has value, rest are empty)
  columns.forEach((_, c) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c });
    ws[cellRef] = {
      t: 's',
      v: c === 0 ? title : '',
      s: {
        font: { bold: true, sz: 14 },
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
      },
    };
  });

  // Merge title across all columns
  ws['!merges'] = [
    {
      s: { r: 0, c: 0 }, // start at A1
      e: { r: 0, c: columns.length - 1 }, // end at last column in row 1
    },
  ];

  // Row 1: Header row with labels
  columns.forEach((col, c) => {
    const cellRef = XLSX.utils.encode_cell({ r: 1, c });
    ws[cellRef] = {
      t: 's',
      v: col.label,
      s: {
        fill: { fgColor: { rgb: 'CCE5FF' } },
        font: { bold: true },
        alignment: { horizontal: 'center' },
      },
    };
  });

  // Row 2: Sample data
  columns.forEach((col, c) => {
    const cellRef = XLSX.utils.encode_cell({ r: 2, c });
    ws[cellRef] = {
      t: 's',
      v: sampleRow[col.key as keyof typeof sampleRow],
    };
  });

  // Define range and formatting
  ws['!ref'] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: 2, c: columns.length - 1 },
  });

  ws['!cols'] = columns.map(() => ({ wch: 25 }));
  ws['!freeze'] = { xSplit: 0, ySplit: 2 };

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Staff');

  const buf = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array',
    cellStyles: true,
  });

  saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'staff_bulk_upload_template.xlsx');
};
