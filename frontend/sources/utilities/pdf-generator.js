import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoImage from "../assets/public/logo-rsn.jpg";

// Company Information for Letterhead
const COMPANY_INFO = {
  name: "PT. Rumah Seho Nusantara",
  brand: "L'Arbre Seho",
  phone: "+62 895 2952 9897",
  address: "Jl. Poluan I, Kakaskasen Dua, Kec. Tomohon Utara, Kota Tomohon, Sulawesi Utara",
  email: "rumahseho.nusantara@gmail.com",
  website: "www.palmlarbreseho.com"
};

// Helper to format date
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Convert image to base64 for PDF embedding
const getLogoBase64 = async () => {
  try {
    // logoImage is already a URL to the bundled asset from Vite
    const response = await fetch(logoImage);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading logo:', error);
    return null;
  }
};

export const generatePDFReport = async ({
  title,
  dateRange,
  columns,
  data,
  fileName,
  recap = [],
}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  let yPos = 15;
  
  // ============ LETTERHEAD SECTION ============
  
  // Try to load and add logo
  try {
    const logoBase64 = await getLogoBase64();
    if (logoBase64) {
      // Add logo on the left side
      doc.addImage(logoBase64, 'PNG', 14, yPos, 25, 25);
    }
  } catch (error) {
    console.error('Could not load logo:', error);
  }
  
  // Company Name and Info (next to logo)
  const textStartX = 45; // Start text after logo
  
  // Company Name - Bold and larger
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(COMPANY_INFO.name, textStartX, yPos + 8);
  
  // Brand Name
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.text(`"${COMPANY_INFO.brand}"`, textStartX, yPos + 15);
  
  // Contact Info - smaller font
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Telp: ${COMPANY_INFO.phone}  |  Email: ${COMPANY_INFO.email}`, textStartX, yPos + 21);
  doc.text(`Alamat: ${COMPANY_INFO.address}`, textStartX, yPos + 26);
  
  yPos += 35;
  
  // ============ SEPARATOR LINE ============
  doc.setDrawColor(22, 163, 74); // Green color to match theme
  doc.setLineWidth(0.8);
  doc.line(14, yPos, pageWidth - 14, yPos);
  
  yPos += 10;
  
  // ============ REPORT TITLE ============
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  
  // Center the title
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, yPos);
  
  yPos += 10;
  
  // ============ DATE RANGE ============
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  if (dateRange) {
    const periodText = `${dateRange}`;
    const periodWidth = doc.getTextWidth(periodText);
    const periodX = (pageWidth - periodWidth) / 2;
    doc.text(periodText, periodX, yPos);
    yPos += 10;
  }
  
  // ============ RECAP SECTION ============
  if (recap && recap.length > 0) {
    yPos += 3;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Rekapitulasi:", 14, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    recap.forEach((item) => {
      doc.text(`• ${item.label} ${item.value}`, 18, yPos);
      yPos += 6;
    });
    yPos += 5;
  }

  // ============ DATA TABLE ============
  autoTable(doc, {
    startY: yPos,
    head: [columns],
    body: data,
    theme: "striped",
    styles: { 
      fontSize: 9,
      cellPadding: 3
    },
    headStyles: { 
      fillColor: [22, 163, 74], // Green color to match theme
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250]
    },
    margin: { left: 14, right: 14 }
  });

  // ============ FOOTER ============
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    
    // Page number
    const pageText = `Halaman ${i} dari ${pageCount}`;
    const pageNumWidth = doc.getTextWidth(pageText);
    doc.text(pageText, pageWidth - 14 - pageNumWidth, doc.internal.pageSize.getHeight() - 10);
    
    // Generated date
    const genDate = `Dicetak: ${formatDate(new Date())}`;
    doc.text(genDate, 14, doc.internal.pageSize.getHeight() - 10);
  }

  // Save
  doc.save(fileName || "report.pdf");
};

