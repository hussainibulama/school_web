import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToExcel = (rows: any[], fileName = 'staff') => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Staff Data');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, `${fileName}-${Date.now()}..xlsx`);
};

export const exportToPDF = (rows: any[], fileName = 'staff') => {
  const doc = new jsPDF();

  const headers = Object.keys(rows[0] || {}).map((key) => key.toUpperCase());
  const data = rows.map((row) => headers.map((header) => row[header.toLowerCase()]));

  autoTable(doc, {
    head: [headers],
    body: data,
    styles: { fontSize: 8 },
  });

  doc.save(`${fileName}-${Date.now()}.pdf`);
};
export const handleExport = (data: any[] = [], format: string) => {
  if (!data.length) return;

  if (format === 'excel') {
    exportToExcel(data);
  } else if (format === 'pdf') {
    exportToPDF(data);
  }
};
