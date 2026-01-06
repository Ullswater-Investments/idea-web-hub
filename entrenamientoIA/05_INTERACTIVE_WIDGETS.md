# Widgets Interactivos - ProcureData

> **Propósito**: Documentar las capacidades interactivas para que ARIA pueda guiar a los usuarios  
> **Ubicación**: `/services` y `/innovation`

---

## 1. Widgets de Servicios (/services)

Los servicios se renderizan con widgets dinámicos según su categoría.  
**Archivo**: `src/components/services/ServiceInteractiveWidget.tsx`

### Mapeo Categoría → Widget

| Categoría | Widget | Descripción |
|-----------|--------|-------------|
| Financiación | `RoiCalculator` | Calculadora de ROI interactiva |
| Compliance | `ProcessFlow` | Simulador de proceso |
| Data Ops | `ProcessFlow` | Simulador de proceso |
| Privacidad | `ProcessFlow` | Simulador de proceso |
| IA & Analytics | `CapabilityTree` | Árbol de capacidades |
| Inteligencia | `CapabilityTree` | Árbol de capacidades |
| Sostenibilidad | `ImpactGauge` | Gauge ESG con confetti |
| Blockchain | `ImpactGauge` | Gauge ESG adaptado |

---

## 2. Detalle de Widgets

### RoiCalculator
**Archivo**: `src/components/services/widgets/RoiCalculator.tsx`

**Qué hace**:
- Slider de volumen (10-1000 operaciones)
- Calcula coste manual vs automatizado
- Muestra ahorro estimado en euros
- Badge "High Saver" si ahorro > 70%

**Modelo de costes**:
```typescript
const COST_MODEL = {
  manualCostPerUnit: 15,  // Coste manual por operación
  autoCostPerUnit: 2,     // Coste con ProcureData
};
```

**Interacción**:
1. Usuario mueve slider de volumen
2. Gráfico de barras se actualiza
3. Ahorro se anima con contador
4. Badge aparece si ahorro es alto

**Frase sugerida para ARIA**:
> "Puedes probar el **Simulador de ROI** en la sección de Servicios para calcular tu ahorro exacto moviendo el slider de volumen."

---

### ProcessFlow
**Archivo**: `src/components/services/widgets/ProcessFlow.tsx`

**Qué hace**:
- Muestra flujo Input → Proceso → Output
- Animación de línea cuando se simula
- Estados: idle, processing, success
- Botón "Simular Proceso"

**Estados**:
```typescript
type ProcessState = 'idle' | 'processing' | 'success';
```

**Interacción**:
1. Usuario hace clic en "Simular Proceso"
2. Línea se anima de izquierda a derecha
3. Nodos cambian de color secuencialmente
4. Al completar, aparece check verde

**Frase sugerida para ARIA**:
> "Haz clic en **Simular Proceso** para ver cómo fluyen los datos desde la entrada hasta la salida del servicio."

---

### CapabilityTree
**Archivo**: `src/components/services/widgets/CapabilityTree.tsx`

**Qué hace**:
- Árbol de 3 nodos: Raw Data → AI Engine → Insight
- Efecto glow al hacer hover
- Líneas animadas conectando nodos
- Badge "Unlock" al hover

**Nodos**:
| Nodo | Icono | Significado |
|------|-------|-------------|
| Raw Data | Database | Datos sin procesar |
| AI Engine | Brain | Motor de IA |
| Insight | Lightbulb | Insight resultante |

**Interacción**:
1. Usuario hace hover sobre el widget
2. Líneas se iluminan progresivamente
3. Nodo central (AI Engine) pulsa
4. Badge "Unlock" aparece

**Frase sugerida para ARIA**:
> "Pasa el ratón por el **Árbol de Capacidades** para ver cómo la IA transforma datos brutos en insights accionables."

---

### ImpactGauge
**Archivo**: `src/components/services/widgets/ImpactGauge.tsx`

**Qué hace**:
- Gauge semicircular (0-100%)
- Colores semáforo (rojo → amarillo → verde)
- Botón "Optimizar Huella"
- Confetti de hojas verdes al optimizar
- Badge "Eco-Hero" si score > 85

**Colores**:
```typescript
const COLORS = {
  red: "#ef4444",    // < 33%
  amber: "#f59e0b",  // 33-66%
  green: "#22c55e",  // > 66%
};
```

**Interacción**:
1. Gauge muestra score inicial (aleatorio 45-75)
2. Usuario hace clic en "Optimizar Huella"
3. Score aumenta (+10-20 puntos)
4. Confetti de hojas verdes cae
5. Si score > 85, aparece badge "Eco-Hero"

**Frase sugerida para ARIA**:
> "El **Gauge ESG** te muestra tu eficiencia actual. Haz clic en 'Optimizar Huella' para simular mejoras y ¡ver confetti de hojas verdes!"

---

## 3. Widgets del Innovation Lab (/innovation)

**Archivo**: `src/pages/InnovationLab.tsx`

### Radar de Madurez Tecnológica
**Ubicación**: Tab "Insights"

**Qué hace**:
- RadarChart con 5 dimensiones
- Compara tu empresa vs líder del sector
- Visualiza gaps de madurez

**Datos**:
```typescript
const TECH_RADAR_DATA = [
  { subject: "IA Adoption", company: 78, leader: 95 },
  { subject: "Blockchain Readiness", company: 45, leader: 88 },
  { subject: "IoT Integration", company: 62, leader: 75 },
  { subject: "ESG Compliance", company: 85, leader: 92 },
  { subject: "Data Governance", company: 70, leader: 98 },
];
```

**Frase sugerida para ARIA**:
> "En el **Innovation Lab** hay un **Radar de Madurez Tecnológica** que compara tu empresa con los líderes del sector en 5 dimensiones."

---

### Matriz de Priorización
**Ubicación**: Tab "Insights"

**Qué hace**:
- ScatterChart con ejes Esfuerzo (X) vs Impacto (Y)
- Muestra conceptos de innovación posicionados
- Ayuda a priorizar inversiones

**Frase sugerida para ARIA**:
> "La **Matriz de Priorización** te ayuda a ver qué proyectos tienen mayor impacto con menor esfuerzo."

---

### Smart Contract Simulator
**Ubicación**: Tab "Insights"

**Qué hace**:
- 4 pasos de ejecución de contrato
- Animación secuencial con timestamps
- Muestra flujo: Firma → Validación → Trigger → Liquidación

**Pasos**:
```typescript
const CONTRACT_STEPS = [
  { id: 1, title: "Firma de Acuerdo", timestamp: "T+0ms" },
  { id: 2, title: "Validación Oráculo", timestamp: "T+2.3s" },
  { id: 3, title: "Trigger Activado", timestamp: "T+3.1s" },
  { id: 4, title: "Liquidación de Pagos", timestamp: "T+4.5s" },
];
```

**Frase sugerida para ARIA**:
> "¿Quieres ver cómo funciona un **Smart Contract**? Ve al Innovation Lab → Insights y prueba el simulador paso a paso."

---

### Contract Sentinel
**Ubicación**: Tab "Insights"

**Qué hace**:
- Escáner de cláusulas contractuales
- Detecta alertas en contratos
- Muestra severidad (warning, error)

**Alertas**:
```typescript
const DETECTED_ALERTS = [
  { id: 1, type: "warning", clause: "Cláusula 4.2", issue: "Ambigüedad" },
  { id: 2, type: "error", clause: "Cláusula 7.1", issue: "Sin límite de responsabilidad" },
  { id: 3, type: "warning", clause: "Cláusula 9.3", issue: "Fecha de vencimiento corta" },
];
```

---

### Simulador de Demanda
**Ubicación**: Tab "Simulator"

**Qué hace**:
- 3 sliders configurables:
  - Crecimiento (0-20%)
  - Estacionalidad (0-50%)
  - Disrupción (-30% a +30%)
- Gráfico de área con predicción vs baseline
- Actualización en tiempo real

**Frase sugerida para ARIA**:
> "En el **Simulador de Demanda** puedes ajustar escenarios de mercado y ver predicciones a 12 meses en tiempo real."

---

## 4. Resumen de Frases para ARIA

| Widget | Ubicación | Frase Sugerida |
|--------|-----------|----------------|
| ROI Calculator | `/services` → Financiación | "Prueba el Simulador de ROI para calcular tu ahorro exacto" |
| ProcessFlow | `/services` → Compliance | "Haz clic en Simular Proceso para ver el flujo de datos" |
| CapabilityTree | `/services` → IA | "Pasa el ratón para ver la transformación de datos" |
| ImpactGauge | `/services` → Sostenibilidad | "Clic en Optimizar Huella para simular mejoras" |
| Radar Madurez | `/innovation` → Insights | "Compara tu empresa con los líderes del sector" |
| Smart Contract | `/innovation` → Insights | "Prueba el simulador de contrato paso a paso" |
| Demand Simulator | `/innovation` → Simulator | "Ajusta escenarios y ve predicciones a 12 meses" |
