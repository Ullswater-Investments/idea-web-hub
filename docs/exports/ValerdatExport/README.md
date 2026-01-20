# VALERDAT Export - Memoria de Ejecución PROCUREDATA

Documentación técnica y de negocio del caso de servicio para **VALERDAT S.L.** como cliente Consumer de PROCUREDATA.

## 📋 Descripción

Este módulo presenta la memoria de ejecución del proyecto VALERDAT Data-Driven, incluyendo:

- **Arquitectura del servicio** con diagrama Mermaid interactivo
- **Cronograma de 4 meses** desde onboarding hasta validación
- **Dashboard de seguimiento** con presupuesto y trazabilidad blockchain
- **KPIs de éxito** alineados con la subvención Kit Espacios de Datos
- **Generador PDF** para documentación offline

## 🚀 Instalación Rápida

### 1. Copiar Archivos

```bash
# Copiar componentes a tu proyecto
cp -r components/valerdat/* src/components/partners/valerdat/
cp pages/ValerdatDoc.tsx src/pages/partners/
cp utils/generateValerdatDocPDF.ts src/utils/
```

### 2. Instalar Dependencias

```bash
npm install framer-motion mermaid jspdf lucide-react sonner
```

### 3. Configurar Rutas en App.tsx

```tsx
import ValerdatDoc from "@/pages/partners/ValerdatDoc";

// En tu Routes
<Route path="/partners/valerdat/doc" element={<ValerdatDoc />} />
```

### 4. (Opcional) Añadir al Footer

```tsx
<Link to="/partners/valerdat/doc">Caso VALERDAT</Link>
```

## 📁 Estructura de Archivos

```
ValerdatExport/
├── README.md                    # Este archivo
├── DESIGN_CONTEXT.md            # Contexto de diseño
├── CSS_VARIABLES.css            # Variables CSS (opcional)
├── DEPENDENCIES.md              # Lista de dependencias
│
├── pages/
│   └── ValerdatDoc.tsx          # Página principal con navegación
│
├── components/
│   ├── index.ts                 # Barrel exports
│   ├── ValerdatHero.tsx         # Hero con progreso del proyecto
│   ├── ValerdatServicioDefinicion.tsx  # Definición del servicio Consumer
│   ├── ValerdatArquitectura.tsx # Diagrama Mermaid de arquitectura
│   ├── ValerdatDashboard.tsx    # Panel con presupuesto y blockchain
│   ├── ValerdatCronograma.tsx   # Timeline de 4 meses
│   ├── ValerdatKPIs.tsx         # Métricas de éxito
│   └── ValerdatCTA.tsx          # Call to action
│
└── utils/
    └── generateValerdatDocPDF.ts  # Generador de PDF (342 líneas)
```

## 🎨 Características de Diseño

| Aspecto | Valor |
|---------|-------|
| **Paleta Principal** | Azul profesional (#2563eb / blue-600) |
| **Estilo** | Enterprise / Documentación técnica |
| **Animaciones** | Framer Motion (scroll reveal) |
| **Diagrama** | Mermaid interactivo |
| **Responsive** | Desktop sidebar + Mobile menu |

## 💼 Contexto del Proyecto

- **Cliente**: VALERDAT S.L. (Consumer de datos industriales)
- **Objetivo**: Ingestar datos para entrenar IA de predicción de precios
- **Presupuesto**: 15.000€ (Kit Espacios de Datos)
- **Período**: 21/07/2025 - 11/11/2025 (4 meses)
- **Cumplimiento**: Gaia-X, GDPR, ODRL v2.2, FAIR/DCAT-AP

## 📦 Componentes shadcn/ui Requeridos

```bash
npx shadcn-ui@latest add badge button card progress table
```

## 🔗 Rutas Relacionadas

| Ruta | Descripción |
|------|-------------|
| `/partners/valerdat/doc` | Documento principal VALERDAT |
| `/partners` | Portal de partners |
| `/catalog` | Catálogo de datasets |
| `/architecture` | Arquitectura PROCUREDATA |

## 📄 Generación de PDF

El módulo incluye un generador PDF de 8 páginas:

```tsx
import { generateValerdatDocPDF } from "@/utils/generateValerdatDocPDF";

// Generar y descargar
generateValerdatDocPDF();
// -> Descarga "VALERDAT_Memoria_Ejecucion.pdf"
```

**Contenido del PDF:**
1. Portada
2. Índice
3. Definición del Servicio
4. Arquitectura
5. Dashboard / Presupuesto
6. Cronograma
7. KPIs
8. Próximos Pasos

---

*Documento elaborado por PROCUREDATA para VALERDAT S.L.*  
*Proyecto financiado por NextGenerationEU - Kit Espacios de Datos*
