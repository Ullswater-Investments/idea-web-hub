import jsPDF from "jspdf";

export const generateTelenaturaProyectoPDF = () => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(34, 139, 34); // Green
  doc.text("TeleNatura-X: Doc Proyecto", 20, 30);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text("Espacio de Datos Agrícola Federado", 20, 45);
  doc.text("Compatible con Gaia-X y PROCUREDATA", 20, 55);
  
  doc.setFontSize(10);
  doc.text("© 2025 TeleNatura EBT × PROCUREDATA", 20, 280);
  
  doc.save("telenatura-proyecto.pdf");
};
