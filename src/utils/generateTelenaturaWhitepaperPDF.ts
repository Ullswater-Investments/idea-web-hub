import jsPDF from "jspdf";
export const generateTelenaturaWhitepaperPDF = () => { const doc = new jsPDF(); doc.setFontSize(24); doc.text("TeleNatura-X: Whitepaper", 20, 30); doc.setFontSize(12); doc.text("El Futuro de la Agricultura Conectada", 20, 45); doc.save("telenatura-whitepaper.pdf"); };
