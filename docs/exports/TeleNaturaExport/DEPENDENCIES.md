# TeleNatura EBT - Dependencies

## NPM Packages

### Core Dependencies

```bash
npm install framer-motion mermaid jspdf lucide-react
```

| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | ^12.x | Animaciones de entrada y scroll |
| `mermaid` | ^11.x | Renderizado de diagramas de arquitectura |
| `jspdf` | ^3.x | Generación de documentos PDF |
| `lucide-react` | ^0.400+ | Iconos SVG |

### UI Components (shadcn/ui)

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add button
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add sheet
```

| Component | Used In |
|-----------|---------|
| `Card` | Todas las secciones de contenido |
| `Badge` | Etiquetas de sección, estados |
| `Button` | CTAs, navegación |
| `ScrollArea` | Sidebar del whitepaper |
| `Sheet` | Menú móvil del whitepaper |

## Pre-installed in Lovable

Estos paquetes ya vienen preinstalados en proyectos Lovable:

- `react` ^18.x
- `react-dom` ^18.x
- `react-router-dom` ^6.x
- `tailwindcss` ^3.x
- `typescript` ^5.x
- `@radix-ui/*` (base de shadcn)
- `clsx`, `tailwind-merge` (utilities)
- `sonner` (toasts)

## Optional Dependencies

### Para el Demo Scheduler (opcional)

Si deseas incluir el agendador de demos integrado con backend:

```bash
npm install @supabase/supabase-js
```

Esto requiere configurar una base de datos Supabase con:
- Tabla `scheduled_demos`
- Políticas RLS apropiadas

### Para funcionalidad avanzada de PDF

```bash
npm install jspdf-autotable
```

Permite generar tablas más complejas en los PDFs.

## Type Dependencies

```bash
npm install -D @types/canvas-confetti
```

(Solo si usas efectos de confetti en algún componente)

## Peer Dependencies

Asegúrate de tener configurado:

### Tailwind CSS

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Las variables CSS de TeleNatura se definen en index.css
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Version Compatibility

| Dependency | Min Version | Tested Version |
|------------|-------------|----------------|
| Node.js | 18.x | 20.x |
| React | 18.2 | 18.3 |
| TypeScript | 5.0 | 5.4 |
| Vite | 5.0 | 5.4 |
| Tailwind | 3.4 | 3.4 |

## Bundle Size Impact

| Package | Gzipped Size | Notes |
|---------|--------------|-------|
| framer-motion | ~45KB | Tree-shakeable |
| mermaid | ~200KB | Lazy load recomendado |
| jspdf | ~80KB | Lazy load recomendado |
| lucide-react | ~2KB/icon | Solo los usados |

### Optimización de Bundle

Para reducir el bundle size:

1. **Lazy load Mermaid**:
```tsx
const MermaidDiagram = lazy(() => import("@/components/MermaidDiagram"));
```

2. **Lazy load jsPDF**:
```tsx
const handleDownload = async () => {
  const { generatePDF } = await import("@/utils/generatePDF");
  generatePDF();
};
```

3. **Import específico de Framer Motion**:
```tsx
import { motion, AnimatePresence } from "framer-motion";
// En lugar de: import * as motion from "framer-motion"
```

## Troubleshooting

### Mermaid SSR Issues

Si tienes problemas con SSR/SSG:

```tsx
import dynamic from 'next/dynamic';
const MermaidDiagram = dynamic(
  () => import('@/components/MermaidDiagram'),
  { ssr: false }
);
```

### Framer Motion Bundle Size

Para reducir el bundle:

```tsx
// Solo importar lo necesario
import { motion } from "framer-motion";
// NO: import { motion, AnimatePresence, useAnimation, ... }
```

### jsPDF Large Bundle

Usar lazy loading:

```tsx
const generatePDF = async () => {
  const jsPDF = (await import('jspdf')).default;
  const doc = new jsPDF();
  // ...
};
```

---

© 2025 TeleNatura EBT × PROCUREDATA
