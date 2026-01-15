import jsPDF from "jspdf";

export const generateTelenaturaWhitepaperPDF = () => {
  const doc = new jsPDF();
  
  doc.setFontSize(24);
  doc.setTextColor(34, 139, 34);
  doc.text("TeleNatura-X: Whitepaper", 20, 30);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text("El Futuro de la Agricultura Conectada", 20, 45);
  
  doc.setFontSize(10);
  doc.text("© 2025 TeleNatura EBT × PROCUREDATA", 20, 280);
  
  doc.save("telenatura-whitepaper.pdf");
};
