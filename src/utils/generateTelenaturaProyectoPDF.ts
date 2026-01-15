import jsPDF from "jspdf";
export const generateTelenaturaProyectoPDF = () => { const doc = new jsPDF(); doc.setFontSize(24); doc.text("TeleNatura-X: Proyecto", 20, 30); doc.setFontSize(12); doc.text("Espacio de Datos Agrícola Federado", 20, 45); doc.text("Compatible con Gaia-X y PROCUREDATA", 20, 55); doc.save("telenatura-proyecto.pdf"); };
