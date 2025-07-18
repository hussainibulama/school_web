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

// utils/printUtil.ts
export const printElement = (element: HTMLElement | null) => {
  if (!element) return;

  const content = element.cloneNode(true) as HTMLElement;
  const iframe = document.createElement('iframe');

  Object.assign(iframe.style, {
    position: 'fixed',
    width: '0',
    height: '0',
    border: '0',
  });

  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
  doc.close();

  // Copy all styles (MUI/emotion/global)
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => {
    doc.head.appendChild(el.cloneNode(true));
  });

  // Inject minimal print styles to avoid overflow
  const style = doc.createElement('style');
  style.textContent = `
    @media print {
      @page {
        size: A4;
        margin: 10mm;
      }

      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-family: sans-serif;
      }

      .print-content {
        width: 100%;
        max-width: 100%;
        overflow-wrap: break-word;
      }

      table {
        width: 100% !important;
        table-layout: fixed;
      }

      th, td {
        word-break: break-word;
      }
    }
  `;
  doc.head.appendChild(style);

  // Wrap content to apply print constraints
  const wrapper = doc.createElement('div');
  wrapper.className = 'print-content';
  wrapper.appendChild(content);
  doc.body.appendChild(wrapper);

  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    document.body.removeChild(iframe);
  }, 300);
};
