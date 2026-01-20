# VALERDAT Export - Dependencias

## 📦 Dependencias NPM Requeridas

### Core

```bash
npm install framer-motion mermaid jspdf lucide-react sonner
```

| Paquete | Versión | Uso |
|---------|---------|-----|
| `framer-motion` | ^12.x | Animaciones scroll reveal |
| `mermaid` | ^11.x | Diagrama de arquitectura interactivo |
| `jspdf` | ^3.x | Generación de PDF (8 páginas) |
| `lucide-react` | ^0.462.x | Iconos |
| `sonner` | ^1.x | Toast notifications |

### React Router

```bash
npm install react-router-dom
```

| Paquete | Versión | Uso |
|---------|---------|-----|
| `react-router-dom` | ^6.x | Navegación y Links |

## 🎨 Componentes shadcn/ui

```bash
npx shadcn-ui@latest add badge button card progress table
```

| Componente | Archivo | Uso |
|------------|---------|-----|
| `Badge` | badge.tsx | Etiquetas de estado, fases |
| `Button` | button.tsx | CTAs, navegación |
| `Card` | card.tsx | Contenedores de secciones |
| `Progress` | progress.tsx | Barras de progreso |
| `Table` | table.tsx | Presupuesto, registros |

## 🔧 Componentes Personalizados Requeridos

### MermaidDiagram

El componente `ValerdatArquitectura.tsx` requiere un componente `MermaidDiagram`:

```tsx
// src/components/MermaidDiagram.tsx
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: "neutral",
        securityLevel: "loose",
      });
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div ref={ref} className="mermaid">
      {chart}
    </div>
  );
};
```

## 📂 Estructura de Imports

### Imports Absolutos (con alias @)

```tsx
// Componentes UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Componentes Custom
import { MermaidDiagram } from "@/components/MermaidDiagram";

// Utils
import { generateValerdatDocPDF } from "@/utils/generateValerdatDocPDF";

// Componentes VALERDAT
import {
  ValerdatHero,
  ValerdatServicioDefinicion,
  ValerdatArquitectura,
  ValerdatDashboard,
  ValerdatCronograma,
  ValerdatKPIs,
  ValerdatCTA,
} from "@/components/partners/valerdat";
```

### Configuración tsconfig.json (paths)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## ✅ Checklist de Instalación

- [ ] `framer-motion` instalado
- [ ] `mermaid` instalado
- [ ] `jspdf` instalado
- [ ] `lucide-react` instalado
- [ ] `sonner` instalado
- [ ] `react-router-dom` instalado
- [ ] Componentes shadcn/ui añadidos (badge, button, card, progress, table)
- [ ] MermaidDiagram component creado
- [ ] Path alias `@/` configurado
- [ ] Archivos copiados a las rutas correctas
- [ ] Ruta añadida en App.tsx

## 🔄 Compatibilidad

| Requisito | Versión Mínima |
|-----------|----------------|
| React | 18.x |
| Node.js | 18.x |
| TypeScript | 5.x |
| Vite | 5.x |
| Tailwind CSS | 3.x |
