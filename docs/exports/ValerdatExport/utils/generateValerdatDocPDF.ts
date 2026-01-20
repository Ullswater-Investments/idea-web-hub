import { jsPDF } from "jspdf";

const MARGIN_LEFT = 25;
const MARGIN_RIGHT = 25;
const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 25;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

const COLORS = {
  black: "#000000",
  darkGray: "#333333",
  mediumGray: "#666666",
  lightGray: "#999999",
  veryLightGray: "#CCCCCC",
  background: "#F5F5F5",
  blue: "#2563eb",
};

export const generateValerdatDocPDF = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let currentY = MARGIN_TOP;

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
    doc.setTextColor(COLORS.blue);
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
    doc.text(`VALERDAT Doc v1.0 — Página ${pageNum}`, MARGIN_LEFT, PAGE_HEIGHT - 10);
    doc.text("PROCUREDATA", PAGE_WIDTH - MARGIN_RIGHT - 30, PAGE_HEIGHT - 10);
  };

  // ===== COVER PAGE =====
  doc.setFontSize(14);
  doc.setTextColor(COLORS.blue);
  doc.text("PROCUREDATA × VALERDAT", PAGE_WIDTH / 2, 60, { align: "center" });

  doc.setFontSize(28);
  doc.setTextColor(COLORS.black);
  doc.text("Memoria de Ejecución", PAGE_WIDTH / 2, 90, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(COLORS.darkGray);
  doc.text("Proyecto VALERDAT Data-Driven", PAGE_WIDTH / 2, 105, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(COLORS.mediumGray);
  const subtitle = "Caso de servicio para cliente Consumer: arquitectura, cronograma y justificación para la subvención Kit Espacios de Datos";
  const subtitleLines = doc.splitTextToSize(subtitle, 140);
  subtitleLines.forEach((line: string, i: number) => {
    doc.text(line, PAGE_WIDTH / 2, 130 + (i * 6), { align: "center" });
  });

  doc.setFontSize(9);
  doc.setTextColor(COLORS.mediumGray);
  doc.text("Consumer | Kit Espacios de Datos | 15.000€ | Gaia-X Compliant", PAGE_WIDTH / 2, 160, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(COLORS.lightGray);
  doc.text("Período: 21/07/2025 - 11/11/2025", PAGE_WIDTH / 2, 250, { align: "center" });
  doc.text("Versión 1.0", PAGE_WIDTH / 2, 258, { align: "center" });

  // ===== PAGE 2: TABLE OF CONTENTS =====
  addPage();
  doc.setFontSize(20);
  doc.setTextColor(COLORS.darkGray);
  doc.text("Índice de Contenidos", MARGIN_LEFT, currentY);
  currentY += 15;

  const tocItems = [
    { num: "01", title: "Definición del Servicio", page: 3 },
    { num: "02", title: "Arquitectura del Servicio", page: 4 },
    { num: "03", title: "Dashboard de Seguimiento", page: 5 },
    { num: "04", title: "Cronograma (4 Meses)", page: 6 },
    { num: "05", title: "Objetivos y KPIs", page: 7 },
    { num: "06", title: "Próximos Pasos", page: 8 },
  ];

  doc.setFontSize(11);
  tocItems.forEach((item) => {
    doc.setTextColor(COLORS.blue);
    doc.text(item.num, MARGIN_LEFT, currentY);
    doc.setTextColor(COLORS.darkGray);
    doc.text(item.title, MARGIN_LEFT + 15, currentY);
    doc.setTextColor(COLORS.lightGray);
    doc.text(String(item.page), PAGE_WIDTH - MARGIN_RIGHT - 10, currentY);
    currentY += 8;
  });

  drawFooter(2);

  // ===== PAGE 3: SERVICE DEFINITION =====
  addPage();
  drawSectionTitle("01", "Definición del Servicio");

  drawParagraph("VALERDAT S.L. actuará principalmente bajo el rol de Consumer (Comprador de Datos) en el ecosistema PROCUREDATA, con el objetivo de ingestar datos externos para entrenar sus algoritmos de IA especializados en predicción de precios y análisis de riesgos de proveedores.");

  drawSubtitle("Servicios PROCUREDATA Utilizados");
  drawBulletPoint("Anonimizador GDPR: Hashing irreversible de IDs de proveedores");
  drawBulletPoint("Modelo IDSA / DCAT-AP: Cumplimiento de estándares de metadatos FAIR");
  drawBulletPoint("Edge Functions + EDC: Conectores para ingesta de datos hacia IA");
  drawBulletPoint("Raw Data Normalizer: Estandarización a JSON-LD interoperable");

  drawSubtitle("Cumplimiento Kit Espacios de Datos");
  drawParagraph("La provisión del servicio se estructura utilizando las Capacidades Enterprise del motor PROCUREDATA para cumplir con todos los requisitos de la convocatoria: gobernanza ODRL, anonimización GDPR, calidad FAIR/DCAT-AP e integración técnica mediante Eclipse EDC.");

  drawFooter(3);

  // ===== PAGE 4: ARCHITECTURE =====
  addPage();
  drawSectionTitle("02", "Arquitectura del Servicio");

  drawParagraph("Flujo de datos desde los proveedores industriales del ecosistema PROCUREDATA hacia el motor de IA de VALERDAT, pasando por las capas de seguridad y gobernanza.");

  drawSubtitle("Capas del Sistema");

  const layers = [
    { name: "Ecosistema PROCUREDATA", desc: "Proveedores industriales publican assets con políticas ODRL" },
    { name: "Capa de Confianza", desc: "Pontus-X blockchain + DIDs verifican identidad VALERDAT (KYB)" },
    { name: "Servicio a VALERDAT", desc: "Procesamiento Data Ops: normalización + anonimización GDPR" },
    { name: "Cliente VALERDAT", desc: "Módulo IA recibe datos limpios para predicción precios/riesgos" },
  ];

  layers.forEach((layer) => {
    checkPageBreak(14);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 12, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(layer.name, MARGIN_LEFT + 5, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(layer.desc, MARGIN_LEFT + 55, currentY + 8);
    currentY += 16;
  });

  drawSubtitle("Flujo de Datos (10 Pasos)");
  drawBulletPoint("Pasos 1-2: Publicación de Assets + Definición ODRL");
  drawBulletPoint("Pasos 3-4: Solicitud de Acceso + Negociación Automática");
  drawBulletPoint("Paso 5: Aprobación via Smart Contract");
  drawBulletPoint("Pasos 6-8: Ingesta → Normalización → Anonimización");
  drawBulletPoint("Pasos 9-10: Entrega Segura → Predicción IA");

  drawFooter(4);

  // ===== PAGE 5: DASHBOARD =====
  addPage();
  drawSectionTitle("03", "Dashboard de Seguimiento");

  drawParagraph("Simulación del panel de control para el seguimiento del proyecto VALERDAT, incluyendo actividad, presupuesto y trazabilidad blockchain.");

  drawSubtitle("Desglose Presupuestario");

  const budget = [
    { concepto: "Personal Propio", importe: "5.000 €" },
    { concepto: "Servicios PROCUREDATA", importe: "6.000 €" },
    { concepto: "Datasets Industriales", importe: "3.000 €" },
    { concepto: "Auditoría y Certificación", importe: "1.000 €" },
  ];

  budget.forEach((item) => {
    checkPageBreak(10);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 10, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(item.concepto, MARGIN_LEFT + 5, currentY + 7);
    doc.text(item.importe, PAGE_WIDTH - MARGIN_RIGHT - 25, currentY + 7);
    currentY += 14;
  });

  doc.setFontSize(11);
  doc.setTextColor(COLORS.blue);
  doc.text("Total: 15.000 €", PAGE_WIDTH - MARGIN_RIGHT - 30, currentY);
  currentY += 12;

  drawSubtitle("Trazabilidad Blockchain (Pontus-X)");
  drawParagraph("Todos los hitos del proyecto quedan notarizados en Pontus-X para auditoría de la subvención: firma de contratos ODRL, pagos de servicios y entregas de datasets.");

  drawFooter(5);

  // ===== PAGE 6: CRONOGRAMA =====
  addPage();
  drawSectionTitle("04", "Cronograma (4 Meses)");

  const fases = [
    { mes: "Mes 1", titulo: "Onboarding y Diagnóstico", fecha: "21/07 - 20/08/2025" },
    { mes: "Mes 2", titulo: "Preparación del Dato", fecha: "21/08 - 20/09/2025" },
    { mes: "Mes 3", titulo: "Integración Técnica", fecha: "21/09 - 20/10/2025" },
    { mes: "Mes 4", titulo: "Validación y Cierre", fecha: "21/10 - 11/11/2025" },
  ];

  fases.forEach((fase) => {
    checkPageBreak(25);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 20, 2, 2, "F");
    doc.setFontSize(11);
    doc.setTextColor(COLORS.blue);
    doc.text(fase.mes, MARGIN_LEFT + 5, currentY + 8);
    doc.setTextColor(COLORS.darkGray);
    doc.text(fase.titulo, MARGIN_LEFT + 25, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(fase.fecha, MARGIN_LEFT + 25, currentY + 15);
    currentY += 25;
  });

  drawSubtitle("Servicios por Fase");
  drawBulletPoint("Mes 1: Identidad SSI (DID + KYB) + Consultoría de necesidades");
  drawBulletPoint("Mes 2: Raw Data Normalizer + Anonimizador GDPR");
  drawBulletPoint("Mes 3: Edge Functions (erp-data-uploader) + Modelo IDSA");
  drawBulletPoint("Mes 4: Audit Logs + Innovation Lab (validación mejora IA)");

  drawFooter(6);

  // ===== PAGE 7: KPIs =====
  addPage();
  drawSectionTitle("05", "Objetivos y KPIs de Éxito");

  drawParagraph("Métricas alineadas con la memoria de VALERDAT y las capacidades de PROCUREDATA para medir el éxito del proyecto.");

  const kpis = [
    { kpi: "Enriquecimiento IA", meta: "3+ datasets industriales", indicador: "Ingesta completada" },
    { kpi: "Cumplimiento Normativo", meta: "100% anonimizado", indicador: "GDPR + ODRL v2.2" },
    { kpi: "Trazabilidad", meta: "100% blockchain", indicador: "Pontus-X notarizado" },
    { kpi: "Eficiencia", meta: "-80% tiempo integración", indicador: "Conectores estandarizados" },
  ];

  kpis.forEach((item) => {
    checkPageBreak(14);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 12, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(item.kpi, MARGIN_LEFT + 5, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.blue);
    doc.text(item.meta, MARGIN_LEFT + 50, currentY + 8);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(item.indicador, MARGIN_LEFT + 100, currentY + 8);
    currentY += 16;
  });

  drawSubtitle("Impacto Esperado");
  drawBulletPoint("+40% Precisión en predicciones IA");
  drawBulletPoint("-60% Tiempo de due diligence");
  drawBulletPoint("100% Cumplimiento normativo");

  drawFooter(7);

  // ===== PAGE 8: NEXT STEPS =====
  addPage();
  drawSectionTitle("06", "Próximos Pasos");

  drawParagraph("PROCUREDATA puede ser tu habilitador técnico para proyectos de adquisición de datos industriales con cumplimiento GDPR, gobernanza ODRL y trazabilidad blockchain.");

  drawSubtitle("Acciones Recomendadas");
  drawBulletPoint("Solicitar Demo: Agenda una demostración personalizada");
  drawBulletPoint("Explorar Catálogo: Descubre los datasets disponibles");
  drawBulletPoint("Contactar: Habla con nuestro equipo sobre tu proyecto");

  drawSubtitle("Documentación Relacionada");
  drawBulletPoint("Memoria Técnica PROCUREDATA");
  drawBulletPoint("Modelo de Gobernanza y Arquitectura");
  drawBulletPoint("White Paper del Espacio de Datos");
  drawBulletPoint("Catálogo de Servicios Enterprise");

  currentY += 20;
  doc.setFontSize(10);
  doc.setTextColor(COLORS.darkGray);
  doc.text("Documento elaborado por PROCUREDATA para VALERDAT S.L.", PAGE_WIDTH / 2, currentY, { align: "center" });
  currentY += 6;
  doc.setFontSize(9);
  doc.setTextColor(COLORS.mediumGray);
  doc.text("Proyecto financiado por NextGenerationEU - Kit Espacios de Datos", PAGE_WIDTH / 2, currentY, { align: "center" });

  drawFooter(8);

  // Save PDF
  doc.save("VALERDAT_Memoria_Ejecucion.pdf");
};
