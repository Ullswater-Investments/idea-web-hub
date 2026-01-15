import { jsPDF } from "jspdf";

// ITBID Technical Document PDF Generator
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

export const generateItbidDocTecnicoPDF = () => {
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
    doc.text(`ITBID-X Documento Técnico v1.0 — Página ${pageNum}`, MARGIN_LEFT, PAGE_HEIGHT - 10);
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
  doc.text("Documento Técnico", PAGE_WIDTH / 2, 105, { align: "center" });
  doc.text("Especificaciones y Gobernanza", PAGE_WIDTH / 2, 115, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(COLORS.mediumGray);
  const subtitle = "Guía completa de implementación técnica, gobernanza ODRL y arquitectura del espacio de datos federado";
  const subtitleLines = doc.splitTextToSize(subtitle, 140);
  subtitleLines.forEach((line: string, i: number) => {
    doc.text(line, PAGE_WIDTH / 2, 135 + (i * 6), { align: "center" });
  });

  // Trust badges
  doc.setFontSize(9);
  doc.setTextColor(COLORS.mediumGray);
  doc.text("Gaia-X Compliant  |  IDSA Standard  |  ODRL W3C", PAGE_WIDTH / 2, 165, { align: "center" });

  // Version info
  doc.setFontSize(10);
  doc.setTextColor(COLORS.lightGray);
  doc.text("Documento Técnico v1.0", PAGE_WIDTH / 2, 250, { align: "center" });
  doc.text("Enero 2026", PAGE_WIDTH / 2, 258, { align: "center" });

  // ===== PAGE 2: TABLE OF CONTENTS =====
  addPage();
  doc.setFontSize(20);
  doc.setTextColor(COLORS.darkGray);
  doc.text("Índice de Contenidos", MARGIN_LEFT, currentY);
  currentY += 15;

  const tocItems = [
    { num: "01", title: "Resumen Ejecutivo", page: 3 },
    { num: "02", title: "Propiedad de Datos", page: 4 },
    { num: "03", title: "Gobernanza ODRL", page: 5 },
    { num: "04", title: "Actualización de Datos", page: 6 },
    { num: "05", title: "Participantes del Ecosistema", page: 7 },
    { num: "06", title: "Responsabilidad Legal", page: 8 },
    { num: "07", title: "Modelo de Negocio", page: 9 },
    { num: "08", title: "Requisitos Técnicos", page: 10 },
    { num: "09", title: "Hoja de Ruta", page: 11 },
    { num: "10", title: "Tipos de Información", page: 12 },
    { num: "11", title: "Diferenciación Competitiva", page: 13 },
    { num: "12", title: "Próximos Pasos", page: 14 },
  ];

  doc.setFontSize(11);
  tocItems.forEach((item) => {
    doc.setTextColor(COLORS.mediumGray);
    doc.text(item.num, MARGIN_LEFT, currentY);
    doc.setTextColor(COLORS.darkGray);
    doc.text(item.title, MARGIN_LEFT + 15, currentY);
    doc.setTextColor(COLORS.lightGray);
    doc.text(String(item.page), PAGE_WIDTH - MARGIN_RIGHT - 10, currentY);
    
    const titleWidth = doc.getTextWidth(item.title);
    for (let x = MARGIN_LEFT + 20 + titleWidth; x < PAGE_WIDTH - MARGIN_RIGHT - 15; x += 3) {
      doc.circle(x, currentY - 1, 0.3, "F");
    }
    currentY += 8;
  });

  drawFooter(2);

  // ===== PAGE 3: EXECUTIVE SUMMARY =====
  addPage();
  drawSectionTitle("01", "Resumen Ejecutivo");

  drawParagraph("Este documento técnico detalla la arquitectura, gobernanza y especificaciones de implementación del espacio de datos federado ITBID-X.");

  drawSubtitle("Objetivo del Documento");
  drawParagraph("Proporcionar una guía completa para equipos técnicos, legales y de negocio que participen en la implementación o integración con ITBID-X.");

  drawSubtitle("Alcance");
  drawBulletPoint("Especificaciones técnicas de la plataforma");
  drawBulletPoint("Modelo de gobernanza basado en ODRL");
  drawBulletPoint("Roles y responsabilidades de los participantes");
  drawBulletPoint("Requisitos de cumplimiento normativo");
  drawBulletPoint("Hoja de ruta de implementación");

  drawSubtitle("Audiencia");
  drawBulletPoint("CTOs y arquitectos de software");
  drawBulletPoint("Responsables de datos y gobernanza");
  drawBulletPoint("Equipos legales y de cumplimiento");
  drawBulletPoint("Gestores de producto y negocio");

  drawFooter(3);

  // ===== PAGE 4: DATA OWNERSHIP =====
  addPage();
  drawSectionTitle("02", "Propiedad de Datos");

  drawParagraph("El modelo de propiedad de datos en ITBID-X sigue los principios de soberanía del dato establecidos por Gaia-X y la International Data Spaces Association.");

  drawSubtitle("Principios Fundamentales");
  drawBulletPoint("Los datos permanecen bajo control del propietario original en todo momento");
  drawBulletPoint("Ningún intermediario puede acceder a los datos sin autorización explícita");
  drawBulletPoint("Las políticas de acceso son definidas y modificadas exclusivamente por el propietario");
  drawBulletPoint("El registro de accesos es inmutable y auditable");

  drawSubtitle("Modelo Tripartito");
  drawParagraph("ITBID-X implementa el modelo tripartito IDSA que separa claramente los roles:");

  const roles = [
    { role: "Data Subject", desc: "Propietario legal con autoridad sobre políticas de acceso" },
    { role: "Data Holder", desc: "Custodio neutral que almacena y entrega datos" },
    { role: "Data Consumer", desc: "Solicitante que accede bajo términos acordados" },
  ];

  roles.forEach((r) => {
    checkPageBreak(14);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 12, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(r.role, MARGIN_LEFT + 5, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(r.desc, MARGIN_LEFT + 45, currentY + 8);
    currentY += 16;
  });

  drawFooter(4);

  // ===== PAGE 5: ODRL GOVERNANCE =====
  addPage();
  drawSectionTitle("03", "Gobernanza ODRL");

  drawParagraph("ODRL (Open Digital Rights Language) es el estándar W3C utilizado por ITBID-X para definir políticas de uso de datos ejecutables por máquinas.");

  drawSubtitle("Componentes de una Política");

  const components = [
    { name: "Permissions", desc: "Acciones permitidas: leer, analizar, agregar, compartir" },
    { name: "Prohibitions", desc: "Acciones prohibidas: redistribuir, exportar, modificar" },
    { name: "Duties", desc: "Obligaciones: atribuir origen, notificar uso, auditar" },
    { name: "Constraints", desc: "Condiciones: período temporal, ubicación, propósito" },
  ];

  components.forEach((c) => {
    checkPageBreak(14);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 12, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(c.name, MARGIN_LEFT + 5, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(c.desc, MARGIN_LEFT + 40, currentY + 8);
    currentY += 16;
  });

  drawSubtitle("Revocación y Auditoría");
  drawParagraph("Las políticas pueden ser revocadas en tiempo real. Cada cambio queda registrado en blockchain para garantizar trazabilidad completa.");

  drawFooter(5);

  // ===== PAGE 6: DATA UPDATE =====
  addPage();
  drawSectionTitle("04", "Actualización de Datos");

  drawParagraph("El sistema de actualización de datos garantiza la frescura y consistencia de la información en todo el ecosistema.");

  drawSubtitle("Mecanismos de Sincronización");
  drawBulletPoint("Push: El Data Subject envía actualizaciones proactivamente");
  drawBulletPoint("Pull: El Data Consumer solicita la última versión disponible");
  drawBulletPoint("Webhook: Notificaciones automáticas ante cambios relevantes");

  drawSubtitle("Versionado de Datos");
  drawParagraph("Cada conjunto de datos mantiene un historial de versiones con:");
  drawBulletPoint("Timestamp de creación y modificación");
  drawBulletPoint("Hash de integridad para verificación");
  drawBulletPoint("Referencia a versiones anteriores");
  drawBulletPoint("Metadatos de autor y proceso de actualización");

  drawSubtitle("Consistencia Eventual");
  drawParagraph("El sistema implementa consistencia eventual con SLA de propagación inferior a 5 segundos para actualizaciones críticas.");

  drawFooter(6);

  // ===== PAGE 7: PARTICIPANTS =====
  addPage();
  drawSectionTitle("05", "Participantes del Ecosistema");

  drawParagraph("El ecosistema ITBID-X integra diversos tipos de participantes con roles y responsabilidades específicas.");

  const participants = [
    { type: "Compradores", desc: "Grandes empresas y administraciones públicas que buscan datos verificados de proveedores." },
    { type: "Proveedores", desc: "Empresas que comparten datos de capacidades, certificaciones y sostenibilidad." },
    { type: "Verificadores", desc: "Entidades acreditadas para validar certificaciones y credenciales." },
    { type: "Integradores", desc: "Partners tecnológicos que conectan ERPs y sistemas legacy." },
  ];

  participants.forEach((p) => {
    checkPageBreak(25);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 20, 2, 2, "F");
    doc.setFontSize(11);
    doc.setTextColor(COLORS.darkGray);
    doc.text(p.type, MARGIN_LEFT + 5, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const descLines = doc.splitTextToSize(p.desc, CONTENT_WIDTH - 10);
    doc.text(descLines, MARGIN_LEFT + 5, currentY + 14);
    currentY += 24;
  });

  drawFooter(7);

  // ===== PAGE 8: LEGAL RESPONSIBILITY =====
  addPage();
  drawSectionTitle("06", "Responsabilidad Legal");

  drawParagraph("El marco legal de ITBID-X establece claramente las responsabilidades de cada participante.");

  drawSubtitle("Responsabilidades del Data Subject");
  drawBulletPoint("Garantizar la veracidad de los datos publicados");
  drawBulletPoint("Mantener actualizadas las políticas de acceso");
  drawBulletPoint("Cumplir con la normativa de protección de datos");

  drawSubtitle("Responsabilidades del Data Holder");
  drawBulletPoint("Custodiar los datos con medidas de seguridad adecuadas");
  drawBulletPoint("Ejecutar políticas ODRL sin modificación");
  drawBulletPoint("Mantener logs de acceso inmutables");

  drawSubtitle("Responsabilidades del Data Consumer");
  drawBulletPoint("Utilizar los datos exclusivamente para el propósito declarado");
  drawBulletPoint("Respetar las restricciones de la política ODRL");
  drawBulletPoint("Notificar brechas de seguridad detectadas");

  drawSubtitle("Cumplimiento Normativo");
  drawParagraph("ITBID-X cumple con GDPR, Data Act, CSRD y regulación sectorial aplicable.");

  drawFooter(8);

  // ===== PAGE 9: BUSINESS MODEL =====
  addPage();
  drawSectionTitle("07", "Modelo de Negocio");

  drawParagraph("El modelo de negocio de ITBID-X se basa en la creación de valor para todos los participantes del ecosistema.");

  drawSubtitle("Fuentes de Ingresos");
  drawBulletPoint("Subscripción: Acceso a la plataforma por tier de funcionalidad");
  drawBulletPoint("Transacción: Comisión por intercambio de datos monetizado");
  drawBulletPoint("Servicios: Integración, consultoría y soporte premium");
  drawBulletPoint("Certificación: Verificación de credenciales y auditorías");

  drawSubtitle("Propuesta de Valor");

  const value = [
    { for: "Compradores", benefit: "Reducción del 60% en tiempo de due diligence" },
    { for: "Proveedores", benefit: "Nuevo revenue stream por datos ESG" },
    { for: "Verificadores", benefit: "Acceso a demanda creciente de auditoría" },
  ];

  value.forEach((v) => {
    checkPageBreak(14);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 12, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(v.for, MARGIN_LEFT + 5, currentY + 8);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(v.benefit, MARGIN_LEFT + 45, currentY + 8);
    currentY += 16;
  });

  drawFooter(9);

  // ===== PAGE 10: TECHNICAL REQUIREMENTS =====
  addPage();
  drawSectionTitle("08", "Requisitos Técnicos");

  drawParagraph("Especificaciones técnicas para la integración con ITBID-X.");

  drawSubtitle("APIs y Protocolos");
  drawBulletPoint("REST API con OpenAPI 3.0 specification");
  drawBulletPoint("GraphQL para consultas complejas");
  drawBulletPoint("WebSocket para actualizaciones en tiempo real");
  drawBulletPoint("IDSA Connector compatible");

  drawSubtitle("Seguridad");
  drawBulletPoint("Autenticación: OAuth 2.0 / OpenID Connect");
  drawBulletPoint("Autorización: Políticas ODRL verificadas en runtime");
  drawBulletPoint("Cifrado: TLS 1.3 en tránsito, AES-256 en reposo");
  drawBulletPoint("Identidad: DID:ethr con credenciales verificables W3C");

  drawSubtitle("Infraestructura");
  drawBulletPoint("Cloud: AWS, Azure, GCP o on-premise");
  drawBulletPoint("Base de datos: PostgreSQL con RLS");
  drawBulletPoint("Blockchain: Pontus-X (Gaia-X compatible)");
  drawBulletPoint("Edge Functions: Deno runtime aislado");

  drawFooter(10);

  // ===== PAGE 11: ROADMAP =====
  addPage();
  drawSectionTitle("09", "Hoja de Ruta");

  drawParagraph("Planificación de evolución de la plataforma ITBID-X.");

  const phases = [
    { quarter: "Q1 2026", milestone: "MVP con funcionalidad core", status: "En desarrollo" },
    { quarter: "Q2 2026", milestone: "Conectores ERP principales", status: "Planificado" },
    { quarter: "Q3 2026", milestone: "Integración Gaia-X Federation", status: "Planificado" },
    { quarter: "Q4 2026", milestone: "Marketplace de datos ESG", status: "Planificado" },
    { quarter: "Q1 2027", milestone: "Expansión europea", status: "Roadmap" },
  ];

  phases.forEach((phase) => {
    checkPageBreak(14);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 12, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(phase.quarter, MARGIN_LEFT + 5, currentY + 8);
    doc.text(phase.milestone, MARGIN_LEFT + 30, currentY + 8);
    doc.setFontSize(8);
    doc.setTextColor(COLORS.lightGray);
    doc.text(phase.status, MARGIN_LEFT + 120, currentY + 8);
    currentY += 16;
  });

  drawFooter(11);

  // ===== PAGE 12: DATA TYPES =====
  addPage();
  drawSectionTitle("10", "Tipos de Información");

  drawParagraph("Categorías de datos soportadas por la plataforma ITBID-X.");

  const dataTypes = [
    { type: "Datos Maestros", examples: "Identificación fiscal, certificaciones, capacidades" },
    { type: "Datos ESG", examples: "Emisiones, consumo energético, políticas sociales" },
    { type: "Datos Operativos", examples: "Inventario, lead times, calidad" },
    { type: "Datos Financieros", examples: "Ratings crediticios, histórico de pagos" },
    { type: "Datos de Compliance", examples: "Auditorías, incidencias, planes de mejora" },
  ];

  dataTypes.forEach((dt) => {
    checkPageBreak(18);
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGIN_LEFT, currentY, CONTENT_WIDTH, 14, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(COLORS.darkGray);
    doc.text(dt.type, MARGIN_LEFT + 5, currentY + 9);
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    doc.text(dt.examples, MARGIN_LEFT + 50, currentY + 9);
    currentY += 18;
  });

  drawFooter(12);

  // ===== PAGE 13: DIFFERENTIATION =====
  addPage();
  drawSectionTitle("11", "Diferenciación Competitiva");

  drawParagraph("Ventajas únicas de ITBID-X frente a alternativas del mercado.");

  drawSubtitle("vs. Data Lakes Tradicionales");
  drawBulletPoint("Soberanía: Los datos no salen de la organización");
  drawBulletPoint("Gobernanza: Políticas ODRL ejecutables automáticamente");
  drawBulletPoint("Interoperabilidad: Conexión nativa con Gaia-X");

  drawSubtitle("vs. Blockchain Públicas");
  drawBulletPoint("Privacidad: Solo hashes en cadena, datos off-chain");
  drawBulletPoint("Escalabilidad: Sin límites de throughput");
  drawBulletPoint("Cumplimiento: GDPR-friendly por diseño");

  drawSubtitle("vs. Plataformas de ESG");
  drawBulletPoint("Verificabilidad: Datos validados por terceros acreditados");
  drawBulletPoint("Trazabilidad: Origen demostrable hasta Tier N");
  drawBulletPoint("Automatización: Integración directa con ERPs");

  drawFooter(13);

  // ===== PAGE 14: NEXT STEPS =====
  addPage();
  drawSectionTitle("12", "Próximos Pasos");

  drawParagraph("Cómo comenzar con la implementación de ITBID-X en tu organización.");

  drawSubtitle("Proceso de Onboarding");
  drawBulletPoint("1. Evaluación inicial de madurez digital y necesidades");
  drawBulletPoint("2. Definición de casos de uso prioritarios");
  drawBulletPoint("3. Diseño de arquitectura de integración");
  drawBulletPoint("4. Piloto con grupo reducido de partners");
  drawBulletPoint("5. Escalado progresivo a toda la red");

  drawSubtitle("Recursos Disponibles");
  drawBulletPoint("Documentación técnica completa en developer portal");
  drawBulletPoint("SDK y conectores pre-construidos");
  drawBulletPoint("Sandbox de pruebas con datos sintéticos");
  drawBulletPoint("Soporte técnico dedicado durante implementación");

  currentY += 10;
  drawSubtitle("Contacto");
  drawParagraph("Para iniciar el proceso de implementación:");
  drawBulletPoint("Email: tech@itbid.com");
  drawBulletPoint("Developer Portal: developers.itbid.com");
  drawBulletPoint("Soporte: support@itbid.com");

  drawFooter(14);

  // Save the PDF
  doc.save("ITBID-X_Documento_Tecnico.pdf");
  return doc;
};
