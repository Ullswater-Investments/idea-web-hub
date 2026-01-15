import jsPDF from "jspdf";
export const generateTelenaturaDocTecnicoPDF = () => { const doc = new jsPDF(); doc.setFontSize(24); doc.text("TeleNatura-X: Documento Técnico", 20, 30); doc.setFontSize(12); doc.text("Arquitectura del Espacio de Datos Agrícola", 20, 45); doc.save("telenatura-doc-tecnico.pdf"); };
