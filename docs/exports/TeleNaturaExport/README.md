# TeleNatura EBT - Export Package

## Descripción

Este paquete contiene todos los archivos necesarios para replicar los 3 documentos de TeleNatura EBT en otro proyecto Lovable:

1. **Doc Proyecto** - Presentación ejecutiva del espacio de datos agrícola
2. **Doc Técnico** - Documentación técnica detallada 
3. **Whitepaper** - Análisis profundo del modelo federado

## Contenido del Paquete

```
TeleNaturaExport/
├── README.md                    # Este archivo
├── DESIGN_CONTEXT.md           # Contexto de diseño AgriTech
├── CSS_VARIABLES.css           # Variables CSS de marca
├── DEPENDENCIES.md             # Dependencias npm necesarias
│
├── pages/
│   ├── TelenaturaProyecto.tsx
│   ├── TelenaturaDocTecnico.tsx
│   └── TelenaturaWhitepaper.tsx
│
├── components/
│   ├── proyecto/               # 8 componentes
│   ├── doctecnico/             # 14 componentes
│   └── whitepaper/             # 13 componentes
│
├── shared-components/
│   ├── MermaidDiagram.tsx
│   └── ProcuredataLogo.tsx
│
└── utils/
    ├── generateTelenaturaProyectoPDF.ts
    ├── generateTelenaturaDocTecnicoPDF.ts
    └── generateTelenaturaWhitepaperPDF.ts
```

## Instalación Paso a Paso

### 1. Instalar Dependencias

```bash
npm install framer-motion mermaid jspdf lucide-react
```

Componentes shadcn/ui necesarios:
```bash
npx shadcn-ui@latest add card badge button scroll-area sheet
```

### 2. Añadir Variables CSS

Añade las siguientes variables CSS a tu archivo `src/index.css`:

```css
/* TeleNatura EBT Brand Colors */
:root {
  --telenatura-green: 142 71% 45%;
  --telenatura-earth: 28 55% 45%;
  --telenatura-sky: 199 89% 48%;
  --telenatura-leaf: 84 68% 50%;
  --telenatura-water: 195 85% 41%;
  --telenatura-soil: 24 38% 35%;
}

/* TeleNatura Gradient Classes */
.telenatura-gradient {
  @apply bg-gradient-to-r from-[hsl(var(--telenatura-green))] to-[hsl(var(--telenatura-leaf))] bg-clip-text text-transparent;
}

.telenatura-gradient-earth {
  @apply bg-gradient-to-r from-[hsl(var(--telenatura-earth))] to-[hsl(var(--telenatura-green))] bg-clip-text text-transparent;
}

.telenatura-font {
  font-family: 'Inter', system-ui, sans-serif;
}
```

### 3. Copiar Archivos

Copia las carpetas a tu proyecto:

```bash
# Páginas
cp -r pages/* src/pages/partners/

# Componentes
cp -r components/* src/components/partners/telenatura/

# Shared Components
cp shared-components/MermaidDiagram.tsx src/components/
cp shared-components/ProcuredataLogo.tsx src/components/

# Utilidades
cp utils/* src/utils/
```

### 4. Configurar Rutas

Añade las rutas en tu `App.tsx`:

```tsx
import TelenaturaProyecto from "@/pages/partners/TelenaturaProyecto";
import TelenaturaDocTecnico from "@/pages/partners/TelenaturaDocTecnico";
import TelenaturaWhitepaper from "@/pages/partners/TelenaturaWhitepaper";

// Dentro del componente Routes
<Route path="/partners/telenatura/proyecto" element={<TelenaturaProyecto />} />
<Route path="/partners/telenatura/doc-tecnico" element={<TelenaturaDocTecnico />} />
<Route path="/partners/telenatura/whitepaper" element={<TelenaturaWhitepaper />} />
```

### 5. Actualizar Imports

Los componentes usan estas rutas de import:
- `@/components/ui/*` - Componentes shadcn/ui
- `@/components/MermaidDiagram` - Renderizador de diagramas
- `@/components/ProcuredataLogo` - Logo SVG
- `@/utils/*` - Generadores de PDF

## Características

### Doc Proyecto (8 secciones)
- ✅ Hero con métricas y logos duales
- ✅ Sección de problemas del agro
- ✅ Solución con 4 pilares
- ✅ Arquitectura con diagrama Mermaid
- ✅ 6 casos de uso con impacto medible
- ✅ 3 casos de éxito con testimonios
- ✅ Kit del Espacio de Datos
- ✅ CTA con opciones de contacto

### Doc Técnico (13 secciones)
- ✅ Navegación lateral interactiva
- ✅ Scroll spy para sección activa
- ✅ Contenido técnico detallado
- ✅ Descarga de PDF
- ✅ Responsive con menú móvil

### Whitepaper (13 secciones)
- ✅ Índice fijo en sidebar
- ✅ Scroll suave entre secciones
- ✅ Contenido académico
- ✅ Glosario de términos
- ✅ Especificaciones técnicas

## Personalización

### Cambiar Colores
Edita las variables CSS en `index.css`. Los colores principales son:
- `--telenatura-green`: Verde principal (agricultura)
- `--telenatura-earth`: Marrón tierra
- `--telenatura-sky`: Azul cielo
- `--telenatura-leaf`: Verde hoja
- `--telenatura-water`: Azul agua

### Cambiar Contenido
Cada componente tiene sus datos en arrays constantes al inicio del archivo. Edita:
- `metrics` - Métricas del hero
- `problems` - Problemas identificados
- `pillars` - Pilares de la solución
- `useCases` - Casos de uso
- `successCases` - Casos de éxito

### Cambiar Logo
Reemplaza el uso de `ProcuredataLogo` con tu propio logo SVG o imagen.

## Requisitos

- React 18+
- TypeScript
- Tailwind CSS 3+
- Vite (recomendado)
- shadcn/ui components

## Créditos

Desarrollado para **TeleNatura EBT** como parte del ecosistema **PROCUREDATA**.

---

© 2025 TeleNatura EBT × PROCUREDATA
