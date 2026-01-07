-- =============================================================================
-- PLAN DE EXPANSIÓN DE OPORTUNIDADES - PROCUREDATA 2026
-- Total: 30 registros | Sectores: Industrial (16), Retail (4), Agro (4), 
-- Movilidad (3), Salud (2), Economía Social (1).
-- =============================================================================

INSERT INTO marketplace_opportunities 
(consumer_org_id, title, description, category, budget_range, status, expires_at) 
VALUES

-- --- INDUSTRIAL (16 OPORTUNIDADES - 51%) ---
('11111111-2222-3333-4444-000000000004', 'Ficha Técnica Proveedores Tier 2 Automoción', 'Buscamos datos maestros verificados de proveedores metalúrgicos Tier 2. Requerimos capacidad productiva trimestral y certificaciones IATF 16949.', 'Industrial', '5,000 - 10,000 EUROe', 'active', NOW() + INTERVAL '38 days'),
('11111111-2222-3333-4444-000000000004', 'Certificaciones ISO Sector Aeronáutico', 'Base de datos de certificados EN9100 y NADCAP vigentes de proveedores europeos para validación de cadena de suministro.', 'Aerospace', '3,000 - 6,000 EUROe', 'active', NOW() + INTERVAL '52 days'),
('11111111-2222-3333-4444-000000000003', 'Telemetría IoT Maquinaria CNC', 'Histórico de 2 años de vibración y temperatura de máquinas CNC para entrenamiento de modelos de mantenimiento predictivo.', 'IoT', '4,000 - 8,000 EUROe', 'active', NOW() + INTERVAL '51 days'),
('11111111-2222-3333-4444-000000000004', 'Capacidad Productiva Fundiciones España', 'Métricas de capacidad disponible y plazos de entrega de fundiciones de hierro y aluminio para planificación Q3-Q4 2026.', 'Industrial', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '22 days'),
('11111111-2222-3333-4444-000000000002', 'Certificados CBAM Importadores Acero', 'Huella de carbono verificada (Scope 1 y 2) de proveedores de acero fuera de la UE para cumplimiento arancelario CBAM.', 'ESG', '8,000 - 15,000 EUROe', 'active', NOW() + INTERVAL '66 days'),
('11111111-2222-3333-4444-000000000004', 'Homologación Proveedores MRO', 'Validación de contratas de mantenimiento industrial con ISO 45001 y seguros RC verificados en blockchain.', 'Compliance', '2,000 - 4,500 EUROe', 'active', NOW() + INTERVAL '12 days'),
('11111111-2222-3333-4444-000000000004', 'Trazabilidad Materias Primas Críticas', 'Datos de origen y cadena de custodia verificada de Litio y Cobalto para cumplimiento de Directiva de Diligencia Debida.', 'Blockchain', '6,000 - 12,000 EUROe', 'active', NOW() + INTERVAL '30 days'),
('11111111-2222-3333-4444-000000000004', 'Digital Twins Líneas de Producción', 'Parámetros operativos y tiempos de ciclo de líneas automatizadas para creación de réplicas virtuales de eficiencia.', 'IoT', '8,000 - 15,000 EUROe', 'active', NOW() + INTERVAL '45 days'),
('11111111-2222-3333-4444-000000000002', 'Scoring Crediticio Proveedores B2B', 'Análisis de riesgo financiero y solvencia de proveedores industriales en el arco mediterráneo.', 'Fintech', '3,000 - 5,000 EUROe', 'active', NOW() + INTERVAL '25 days'),
('11111111-2222-3333-4444-000000000003', 'Logs Mantenimiento Brazos Robóticos', 'Histórico de fallos mecánicos y paradas imprevistas de robots industriales Serie-X para modelos de IA preventiva.', 'AI', '5,000 - 9,000 EUROe', 'active', NOW() + INTERVAL '40 days'),
('11111111-2222-3333-4444-000000000001', 'Histórico Pedidos Sector Plásticos', 'Datos anonimizados de transacciones y volúmenes de compra de inyección de plásticos (2022-2025).', 'Industrial', '3,000 - 5,500 EUROe', 'active', NOW() + INTERVAL '18 days'),
('11111111-2222-3333-4444-000000000002', 'Consumo Energético por Planta', 'Desglose de consumo eléctrico (kWh) y fuentes de energía de plantas de manufactura para reporting CSRD.', 'Energy', '5,000 - 10,000 EUROe', 'active', NOW() + INTERVAL '60 days'),
('11111111-2222-3333-4444-000000000003', 'Inventario Tiempo Real Componentes', 'API de acceso a stock disponible de semiconductores y conectores en distribuidores autorizados.', 'Industrial', '3,000 - 6,000 EUROe', 'active', NOW() + INTERVAL '14 days'),
('11111111-2222-3333-4444-000000000001', 'Auditorías Sociales Proveedores Tier 3', 'Informes de auditoría social (BSCI/Sedex) verificados de proveedores de materias primas textiles.', 'ESG', '4,000 - 7,000 EUROe', 'active', NOW() + INTERVAL '35 days'),
('11111111-2222-3333-4444-000000000004', 'Métricas Calidad Six Sigma', 'Dataset de PPM y tasas de rechazo por lote de proveedores de estampación metálica.', 'Industrial', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '20 days'),
('11111111-2222-3333-4444-000000000003', 'Predicción Demanda Sector Químico', 'Series temporales de consumo de solventes y resinas industriales para modelos de forecasting logístico.', 'AI', '6,000 - 10,000 EUROe', 'active', NOW() + INTERVAL '55 days'),

-- --- COMERCIO (4 OPORTUNIDADES - 15%) ---
('11111111-2222-3333-4444-000000000001', 'Tráfico Peatonal Madrid Centro', 'Datos georeferenciados de afluencia peatonal en zonas Prime de Madrid para expansión de puntos de venta.', 'Retail', '2,500 - 4,000 EUROe', 'active', NOW() + INTERVAL '30 days'),
('11111111-2222-3333-4444-000000000001', 'Histórico Ventas E-commerce Moda', 'Tendencias de consumo online, ticket medio y tasas de retorno en el mercado español de moda (2024).', 'Retail', '4,000 - 7,000 EUROe', 'active', NOW() + INTERVAL '45 days'),
('11111111-2222-3333-4444-000000000001', 'Auditorías Ética Cadena Retail', 'Validación de proveedores de marca propia contra estándares de trabajo justo y no explotación infantil.', 'ESG', '3,000 - 5,000 EUROe', 'active', NOW() + INTERVAL '60 days'),
('11111111-2222-3333-4444-000000000003', 'Logística Última Milla ZBE BCN', 'Datos de eficiencia de entrega y ahorro de emisiones de flotas eléctricas en la Zona de Bajas Emisiones de Barcelona.', 'Logistics', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '22 days'),

-- --- AGROALIMENTARIO (4 OPORTUNIDADES - 12%) ---
('11111111-2222-3333-4444-000000000005', 'Huella Hídrica Aceite Jaén', 'Registros de consumo de agua por hectárea en explotaciones de Jaén para cumplimiento de etiquetas ESG internacionales.', 'AgriFood', '3,000 - 6,000 EUROe', 'active', NOW() + INTERVAL '32 days'),
('11111111-2222-3333-4444-000000000005', 'Trazabilidad Lotes Ecológicos', 'Cadena de custodia verificada desde finca hasta envasado para cítricos con certificación ecológica certificada.', 'AgriFood', '2,000 - 4,000 EUROe', 'active', NOW() + INTERVAL '40 days'),
('11111111-2222-3333-4444-000000000005', 'Datos IoT Cadena de Frío', 'Histórico de sensores de temperatura en transporte lácteo interurbano para validación de seguridad alimentaria.', 'IoT', '4,000 - 7,000 EUROe', 'active', NOW() + INTERVAL '28 days'),
('11111111-2222-3333-4444-000000000005', 'Denominaciones de Origen Verificadas', 'Pruebas inmutables de procedencia geográfica para vinos con Denominación de Origen protegida.', 'Blockchain', '2,500 - 4,500 EUROe', 'active', NOW() + INTERVAL '35 days'),

-- --- MOVILIDAD SOSTENIBLE (3 OPORTUNIDADES - 10%) ---
('11111111-2222-3333-4444-000000000002', 'Emisiones Scope 3 Flotas BCN', 'Cálculo de CO2 real por tonelada transportada en el área metropolitana de Barcelona para reporting corporativo.', 'ESG', '5,000 - 8,000 EUROe', 'active', NOW() + INTERVAL '42 days'),
('11111111-2222-3333-4444-000000000003', 'Telemetría Flotas Eléctricas', 'Datos de degradación de baterías y autonomía real bajo carga para optimización de costes operativos de flota.', 'IoT', '4,000 - 7,000 EUROe', 'active', NOW() + INTERVAL '50 days'),
('11111111-2222-3333-4444-000000000003', 'Optimización Retornos Vacíos', 'Datasets de rutas de transporte con carga parcial para mejorar ratios de economía circular y ahorro de combustible.', 'AI', '3,000 - 6,000 EUROe', 'active', NOW() + INTERVAL '24 days'),

-- --- SALUD (2 OPORTUNIDADES - 7%) ---
('11111111-2222-3333-4444-000000000003', 'Verificación Licencias Médicas', 'Base de datos de dispositivos médicos con marcado CE y cumplimiento MDR (Reglamento de Dispositivos Médicos).', 'Pharma', '3,000 - 5,000 EUROe', 'active', NOW() + INTERVAL '48 days'),
('11111111-2222-3333-4444-000000000003', 'Datos Anonimizados Ensayos Clínicos', 'Datos de resultados agregados de ensayos fase III para investigación secundaria de eficacia farmacológica.', 'Pharma', '6,000 - 10,000 EUROe', 'active', NOW() + INTERVAL '65 days'),

-- --- ECONOMÍA SOCIAL (1 OPORTUNIDAD - 5%) ---
('11111111-2222-3333-4444-000000000002', 'Métricas SROI Empresas Inserción', 'Impacto social verificado de proveedores de servicios de limpieza y catering (centros especiales de empleo).', 'ESG', '1,500 - 3,000 EUROe', 'active', NOW() + INTERVAL '58 days');