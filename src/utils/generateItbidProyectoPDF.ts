import { jsPDF } from "jspdf";

// ITBID Project PDF Generator
// Optimized for print with grayscale tones and proper margins

const MARGIN_LEFT = 25;
const MARGIN_RIGHT = 25;
const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 25;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

// Grayscale color palette
const COLORS = {
  black: "#000000",
  darkGray: "#333333",
  mediumGray: "#666666",
  lightGray: "#999999",
  veryLightGray: "#CCCCCC",
  background: "#F5F5F5",
};

export const generateItbidProyectoPDF = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let currentY = MARGIN_TOP;

  // Helper functions
  const addPage = () => {
    doc.addPage();
    currentY = MARGIN_TOP;
  };

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > PAGE_HEIGHT - MARGIN_BOTTOM) {
      addPage();
      return true;
    }
    return false;
  };

  const drawSectionTitle = (number: string, title: string) => {
    checkPageBreak(20);
    doc.setFontSize(10);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(`${number} —`, MARGIN_LEFT, currentY);
    currentY += 8;
    doc.setFontSize(18);
    doc.setTextColor(COLORS.darkGray);
    doc.text(title, MARGIN_LEFT, currentY);
    currentY += 12;
  };

  const drawParagraph = (text: string, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(COLORS.mediumGray);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
    lines.forEach((line: string) => {
      checkPageBreak(6);
      doc.text(line, MARGIN_LEFT, currentY);
      currentY += 5;
    });
    currentY += 3;
  };

  const drawSubtitle = (text: string) => {
    checkPageBreak(12);
    doc.setFontSize(12);
    doc.setTextColor(COLORS.darkGray);
    doc.text(text, MARGIN_LEFT, currentY);
    currentY += 8;
  };

  const drawBulletPoint = (text: string) => {
    checkPageBreak(8);
    doc.setFontSize(10);
    doc.setTextColor(COLORS.mediumGray);
    doc.text("•", MARGIN_LEFT, currentY);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 8);
    lines.forEach((line: string, i: number) => {
      doc.text(line, MARGIN_LEFT + 8, currentY + (i * 5));
    });
    currentY += lines.length * 5 + 2;
  };

  const drawFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setTextColor(COLORS.lightGray);
    doc.text(`ITBID-X Documento de Proyecto v1.0 — Página ${pageNum}`, MARGIN_LEFT, PAGE_HEIGHT - 10);
    doc.text("PROCUREDATA × ITBID", PAGE_WIDTH - MARGIN_RIGHT - 40, PAGE_HEIGHT - 10);
  };

  // ===== COVER PAGE =====
  doc.setFontSize(14);
  doc.setTextColor(COLORS.darkGray);
  doc.text("PROCUREDATA × ITBID", PAGE_WIDTH / 2, 60, { align: "center" });

  doc.setFontSize(32);
  doc.setTextColor(COLORS.black);
  doc.text("ITBID-X", PAGE_WIDTH / 2, 90, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(COLORS.darkGray);
  doc.text("Documento de Proyecto", PAGE_WIDTH / 2, 105, { align: "center" });
  doc.text("Espacio de Datos Federado", PAGE_WIDTH / 2, 115, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(COLORS.mediumGray);
  const subtitle = "Transformando la contratación B2B mediante soberanía de datos e interoperabilidad europea Gaia-X";
  const subtitleLines = doc.splitTextToSize(subtitle, 140);
  subtitleLines.forEach((line: string, i: number) => {
    doc.text(line, PAGE_WIDTH / 2, 135 + (i * 6), { align: "center" });
  });

  // Trust badges
  doc.setFontSize(9);
  doc.setTextColor(COLORS.mediumGray);
  doc.text("Gaia-X Compliant  |  IDSA Standard  |  Web3 Enabled", PAGE_WIDTH / 2, 165, { align: "center" });

  // Version info
  doc.setFontSize(10);
  doc.setTextColor(COLORS.lightGray);
  doc.text("Documento de Proyecto v1.0", PAGE_WIDTH / 2, 250, { align: "center" });
  doc.text("Enero 2026", PAGE_WIDTH / 2, 258, { align: "center" });

  // ===== PAGE 2: TABLE OF CONTENTS =====
  addPage();
  doc.setFontSize(20);
  doc.setTextColor(COLORS.darkGray);
  doc.text("Índice de Contenidos", MARGIN_LEFT, currentY);
  currentY += 15;

  const tocItems = [
    { num: "01", title: "El Problema", page: 3 },
    { num: "02", title: "La Solución ITBID-X", page: 4 },
    { num: "03", title: "Arquitectura Técnica", page: 5 },
    { num: "04", title: "Casos de Uso", page: 6 },
    { num: "05", title: "Casos de Éxito", page: 7 },
    { num: "06", title: "Kit de Espacios de Datos", page: 8 },
    { num: "07", title: "Próximos Pasos", page: 9 },
  ];

  doc.setFontSize(11);
  tocItems.forEach((item) => {
    doc.setTextColor(COLORS.mediumGray);
    doc.text(item.num, MARGIN_LEFT, currentY);
    doc.setTextColor(COLORS.darkGray);
    doc.text(item.title, MARGIN_LEFT + 15, currentY);
    doc.setTextColor(COLORS.lightGray);
    doc.text(String(item.page), PAGE_WIDTH - MARGIN_RIGHT - 10, currentY);
    
    // Dotted line
    doc.setDrawColor(COLORS.veryLightGray);
    const titleWidth = doc.getTextWidth(item.title);
    for (let x = MARGIN_LEFT + 20 + titleWidth; x < PAGE_WIDTH - MARGIN_RIGHT - 15; x += 3) {
      doc.circle(x, currentY - 1, 0.3, "F");
    }
    currentY += 8;
  });

  drawFooter(2);

  // ===== PAGE 3: THE PROBLEM =====
  addPage();
  drawSectionTitle("01", "El Problema");

  drawParagraph("El mercado B2B europeo enfrenta desafíos estructurales que frenan la competitividad y la sostenibilidad de las cadenas de suministro.");

  drawSubtitle("Fragmentación de Datos");
  drawParagraph("Las empresas operan con silos de información incompatibles. Cada ERP, cada plataforma de compras y cada sistema de gestión genera datos que no pueden comunicarse entre sí.");

  drawSubtitle("Falta de Transparencia ESG");
  drawBulletPoint("El 73% de las empresas no puede verificar las credenciales ESG de sus proveedores");
  drawBulletPoint("El greenwashing cuesta €500M anuales en multas y reputación dañada");
  drawBulletPoint("La directiva CSRD exige trazabilidad completa desde 2025");

  drawSubtitle("Ineficiencias en Contratación");
  drawBulletPoint("Tiempo medio de cualificación de proveedores: 45 días");
  drawBulletPoint("Duplicación de solicitudes de información: 60% de los datos ya existen");
  drawBulletPoint("Coste oculto de verificación manual: €12,000 por proveedor/año");

  drawSubtitle("Riesgo Regulatorio");
  drawParagraph("El Data Act europeo (2025) obliga a las empresas a compartir datos bajo condiciones controladas. Sin infraestructura adecuada, el cumplimiento será costoso y complejo.");

  drawFooter(3);

  // ===== PAGE 4: THE SOLUTION =====
  addPage();
  drawSectionTitle("02", "La Solución ITBID-X");

  drawParagraph("ITBID-X transforma ITBID en un hub de datos federado compatible con Gaia-X, permitiendo el intercambio soberano de información entre compradores y proveedores.");

  drawSubtitle("Propuesta de Valor");

  const valueProps = [
    { title: "Soberanía del Dato", desc: "Cada organización mantiene el control total sobre sus datos. Políticas ODRL definen quién puede acceder, cuándo y para qué propósito." },
    { title: "Interoperabilidad Nativa", desc: "Conexión directa con 250+ espacios de datos Gaia-X europeos. Integración con ERPs mediante conectores estándar." },
    { title: "Confianza Verificable", desc: "Identidades DID, credenciales verificables y registro en blockchain. Sin necesidad de confiar en intermediarios." },
    { title: "Cumplimiento Automático", desc: "Trazabilidad ESG integrada. Informes CSRD generados automáticamente. Auditoría en tiempo real." },
  ];

  valueProps.forEach((prop) => {
    checkPageBreak(25);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 22, 2, 2, "F");
    doc.setFontSize(11);
    doc.setTextColor(COLORS.darkGray);
    doc.text(prop.title, MARGIN_LEFT + 5, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const descLines = doc.splitTextToSize(prop.desc, CONTENT_WIDTH - 10);
    doc.text(descLines, MARGIN_LEFT + 5, currentY + 15);
    currentY += 28;
  });

  drawFooter(4);

  // ===== PAGE 5: ARCHITECTURE =====
  addPage();
  drawSectionTitle("03", "Arquitectura Técnica");

  drawParagraph("La arquitectura de ITBID-X se basa en el modelo tripartito de la International Data Spaces Association (IDSA) y los estándares Gaia-X.");

  drawSubtitle("Modelo Tripartito IDSA");

  const roles = [
    { title: "Data Subject", desc: "Propietario legal de los datos. Define políticas de acceso." },
    { title: "Data Holder", desc: "Custodio neutral que almacena y entrega datos verificando credenciales." },
    { title: "Data Consumer", desc: "Solicitante que accede a datos bajo términos acordados." },
  ];

  roles.forEach((role) => {
    checkPageBreak(18);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 14, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(role.title, MARGIN_LEFT + 5, currentY + 9);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(role.desc, MARGIN_LEFT + 45, currentY + 9);
    currentY += 18;
  });

  drawSubtitle("Stack Tecnológico");
  drawBulletPoint("Base de datos: PostgreSQL con Row Level Security (RLS)");
  drawBulletPoint("Backend: Edge Functions serverless con aislamiento por tenant");
  drawBulletPoint("Blockchain: Pontus-X (red Gaia-X) para registro inmutable");
  drawBulletPoint("Identidad: DID:ethr + Credenciales Verificables W3C");
  drawBulletPoint("Gobernanza: Políticas ODRL ejecutables automáticamente");

  drawFooter(5);

  // ===== PAGE 6: USE CASES =====
  addPage();
  drawSectionTitle("04", "Casos de Uso");

  const useCases = [
    {
      title: "Trazabilidad ESG en Cadena de Suministro",
      desc: "Verificación automática de certificaciones ambientales y sociales de proveedores Tier 1-3.",
      metrics: ["60% reducción en tiempo de due diligence", "100% trazabilidad de origen"]
    },
    {
      title: "Contratación Pública Transparente",
      desc: "Adjudicación basada en datos verificables sin posibilidad de manipulación.",
      metrics: ["45% ahorro en costes administrativos", "Auditoría inmediata"]
    },
    {
      title: "Marketplace de Datos Industriales",
      desc: "Monetización de datos de producción, calidad y logística entre empresas.",
      metrics: ["Nuevo revenue stream", "Control total sobre licencias"]
    },
    {
      title: "Compliance CSRD Automatizado",
      desc: "Generación automática de informes de sostenibilidad con datos verificados.",
      metrics: ["80% reducción en tiempo de reporting", "Sin errores manuales"]
    },
  ];

  useCases.forEach((uc) => {
    checkPageBreak(40);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 35, 2, 2, "F");
    
    doc.setFontSize(11);
    doc.setTextColor(COLORS.darkGray);
    doc.text(uc.title, MARGIN_LEFT + 5, currentY + 8);
    
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const descLines = doc.splitTextToSize(uc.desc, CONTENT_WIDTH - 10);
    doc.text(descLines, MARGIN_LEFT + 5, currentY + 15);
    
    doc.setFontSize(8);
    uc.metrics.forEach((metric, i) => {
      doc.text(`✓ ${metric}`, MARGIN_LEFT + 5, currentY + 25 + (i * 4));
    });
    
    currentY += 40;
  });

  drawFooter(6);

  // ===== PAGE 7: SUCCESS CASES =====
  addPage();
  drawSectionTitle("05", "Casos de Éxito");

  drawParagraph("Empresas pioneras ya están experimentando los beneficios del modelo federado de datos.");

  const successCases = [
    {
      company: "Consorcio Agroalimentario del Mediterráneo",
      sector: "Agroalimentario",
      result: "Trazabilidad completa desde origen hasta consumidor final. Reducción del 40% en incidencias de calidad."
    },
    {
      company: "Red de Hospitales del Levante",
      sector: "Salud",
      result: "Intercambio seguro de datos de equipamiento médico. Optimización del 25% en inventario compartido."
    },
    {
      company: "Cluster Industrial de Automoción",
      sector: "Automoción",
      result: "Verificación ESG de proveedores Tier 2-3. Cumplimiento CSRD garantizado."
    },
  ];

  successCases.forEach((sc) => {
    checkPageBreak(35);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 30, 2, 2, "F");
    
    doc.setFontSize(11);
    doc.setTextColor(COLORS.darkGray);
    doc.text(sc.company, MARGIN_LEFT + 5, currentY + 8);
    
    doc.setFontSize(9);
    doc.setTextColor(COLORS.lightGray);
    doc.text(`Sector: ${sc.sector}`, MARGIN_LEFT + 5, currentY + 14);
    
    doc.setTextColor(COLORS.mediumGray);
    const resultLines = doc.splitTextToSize(sc.result, CONTENT_WIDTH - 10);
    doc.text(resultLines, MARGIN_LEFT + 5, currentY + 22);
    
    currentY += 35;
  });

  drawFooter(7);

  // ===== PAGE 8: DATA SPACE KIT =====
  addPage();
  drawSectionTitle("06", "Kit de Espacios de Datos");

  drawParagraph("El Kit de Espacios de Datos proporciona todo lo necesario para implementar ITBID-X en cualquier organización.");

  drawSubtitle("Componentes del Kit");
  drawBulletPoint("Conectores IDSA pre-configurados para integración con ERPs");
  drawBulletPoint("SDK para desarrollo de aplicaciones federadas");
  drawBulletPoint("Dashboard de gobernanza y monitorización");
  drawBulletPoint("Plantillas ODRL para políticas comunes");
  drawBulletPoint("Documentación técnica y guías de implementación");

  drawSubtitle("Modelos de Implementación");

  const models = [
    { title: "SaaS Compartido", desc: "Infraestructura gestionada por ITBID. Ideal para PYMES." },
    { title: "Dedicated Cloud", desc: "Instancia aislada en cloud público. Para empresas medianas." },
    { title: "On-Premise", desc: "Instalación en infraestructura propia. Para grandes corporaciones." },
  ];

  models.forEach((model) => {
    checkPageBreak(18);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 14, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(model.title, MARGIN_LEFT + 5, currentY + 9);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(model.desc, MARGIN_LEFT + 45, currentY + 9);
    currentY += 18;
  });

  drawFooter(8);

  // ===== PAGE 9: NEXT STEPS =====
  addPage();
  drawSectionTitle("07", "Próximos Pasos");

  drawParagraph("Únete al ecosistema ITBID-X y transforma tu cadena de suministro.");

  drawSubtitle("Roadmap de Implementación");

  const roadmap = [
    { phase: "Fase 1", title: "Evaluación", desc: "Análisis de madurez digital y diseño de arquitectura" },
    { phase: "Fase 2", title: "Piloto", desc: "Implementación con grupo reducido de partners" },
    { phase: "Fase 3", title: "Escalado", desc: "Expansión a toda la red de proveedores" },
    { phase: "Fase 4", title: "Optimización", desc: "Monetización de datos y nuevos casos de uso" },
  ];

  roadmap.forEach((step) => {
    checkPageBreak(18);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 14, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(step.phase, MARGIN_LEFT + 5, currentY + 9);
    doc.text(step.title, MARGIN_LEFT + 25, currentY + 9);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(step.desc, MARGIN_LEFT + 60, currentY + 9);
    currentY += 18;
  });

  currentY += 10;
  drawSubtitle("Contacto");
  drawParagraph("Para más información sobre cómo implementar ITBID-X en tu organización:");
  drawBulletPoint("Email: info@itbid.com");
  drawBulletPoint("Web: www.itbid.com/itbid-x");
  drawBulletPoint("Demo: Solicita una demostración personalizada");

  drawFooter(9);

  // Save the PDF
  doc.save("ITBID-X_Documento_Proyecto.pdf");
  return doc;
};
