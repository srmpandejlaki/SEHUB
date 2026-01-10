import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const generatePDFReport = ({
  title,
  dateRange,
  columns,
  data,
  fileName,
  recap = [],
}) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  // Date Range
  doc.setFontSize(12);
  let yPos = 30;
  if (dateRange) {
    doc.text(`Periode: ${dateRange}`, 14, yPos);
    yPos += 10;
  }

  // Recap Section (if any)
  if (recap && recap.length > 0) {
    doc.setFontSize(11);
    doc.text("Rekapitulasi:", 14, yPos);
    yPos += 7;
    
    recap.forEach((item) => {
      doc.text(`${item.label}: ${item.value}`, 14, yPos);
      yPos += 6;
    });
    yPos += 5; // spacing before table
  }

  // Table
  autoTable(doc, {
    startY: yPos,
    head: [columns],
    body: data,
    theme: "striped",
    styles: { fontSize: 9 },
    headStyles: { fillColor: [22, 163, 74] }, // Green color match
  });

  // Save
  doc.save(fileName || "report.pdf");
};
