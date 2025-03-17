
import { ChecklistGroupData } from '@/components/checklists/ChecklistGroup';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateChecklistPDF = (checklists: ChecklistGroupData[]): Blob => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Flyber - Private Pilot Checklist', 105, 15, { align: 'center' });
  
  // Add current date
  const currentDate = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Generated on: ${currentDate}`, 105, 25, { align: 'center' });
  
  let yPosition = 35;
  const pageWidth = doc.internal.pageSize.width;
  
  // Process each checklist group
  checklists.forEach((group) => {
    // Check if we need a new page
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 15;
    }
    
    // Add group title
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(group.title, 14, yPosition);
    yPosition += 8;
    
    // Prepare table data for this group
    const tableData = group.items.map(item => {
      return [
        item.title,
        item.isCompleted ? 'Completed' : 'Incomplete',
        item.value ? (
          typeof item.value === 'object' 
            ? JSON.stringify(item.value).replace(/[{}"]/g, '').replace(/,/g, ', ') 
            : item.value.toString()
        ) : 'N/A',
        '' // Instructor initials column
      ];
    });
    
    // Add the table
    autoTable(doc, {
      startY: yPosition,
      head: [['Task', 'Status', 'Value', 'Instructor Initials']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [255, 165, 0] }, // Orange header
      columnStyles: {
        0: { cellWidth: 80 }, // Task column
        1: { cellWidth: 30 }, // Status column
        2: { cellWidth: 'auto' }, // Value column
        3: { cellWidth: 30 }  // Instructor initials column
      },
      didDrawPage: (data) => {
        // Add footer
        doc.setFontSize(10);
        // Use a safe way to get the current page number that works across jsPDF versions
        const pageNumber = typeof doc.getNumberOfPages === 'function' 
              ? doc.getNumberOfPages() 
              : (doc.internal.pages ? doc.internal.pages.length - 1 : 1);
        doc.text('Flyber Checklist - Page ' + pageNumber, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }
    });
    
    // Update Y position after table
    yPosition = (doc as any).lastAutoTable.finalY + 15;
  });
  
  // Add signature sections at the end
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Endorsements', 14, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Flight Instructor Signature:', 14, yPosition);
  
  // Draw signature line
  doc.line(60, yPosition + 5, 180, yPosition + 5);
  yPosition += 15;
  
  doc.text('Instructor Certificate Number:', 14, yPosition);
  doc.line(70, yPosition + 5, 180, yPosition + 5);
  yPosition += 15;
  
  doc.text('Expiration Date:', 14, yPosition);
  doc.line(50, yPosition + 5, 120, yPosition + 5);
  
  // Return the PDF as a blob
  return doc.output('blob');
};

export const downloadPDF = (pdfBlob: Blob): void => {
  // Create a URL for the blob
  const url = URL.createObjectURL(pdfBlob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = 'flyber-pilot-checklist.pdf';
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL
  URL.revokeObjectURL(url);
};
