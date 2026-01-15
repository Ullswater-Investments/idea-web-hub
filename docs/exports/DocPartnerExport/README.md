# Doc Partner Export - ITBID Technical Document

## Overview
This package contains a complete export of the ITBID Technical Document (`/partners/itbid/doc-tecnico`) ready to be integrated into another Lovable project.

## Package Contents

```
DocPartnerExport/
├── README.md                          # This file - installation guide
├── DESIGN_CONTEXT.md                  # Design system documentation
├── CONTENT_DATA.json                  # All static content (texts, diagrams, data)
├── CSS_VARIABLES.css                  # ITBID brand CSS variables
├── DEPENDENCIES.md                    # Required npm packages
│
├── page/
│   └── ItbidDocTecnico.tsx           # Main page component
│
├── components/
│   ├── index.ts                       # Barrel export
│   ├── DocTecnicoHero.tsx
│   ├── DocResumenEjecutivo.tsx
│   ├── DocPropiedadDatos.tsx
│   ├── DocGobernanza.tsx
│   ├── DocActualizacion.tsx
│   ├── DocParticipantes.tsx
│   ├── DocResponsabilidadLegal.tsx
│   ├── DocModeloNegocio.tsx
│   ├── DocRequisitosTecnicos.tsx
│   ├── DocHojaDeRuta.tsx
│   ├── DocTiposInformacion.tsx
│   ├── DocDiferenciacion.tsx
│   ├── DocCTA.tsx
│   └── DemoSchedulerDialog.tsx
│
├── shared-components/
│   ├── AnimatedSection.tsx            # Animation components
│   ├── MermaidDiagram.tsx             # Mermaid diagram renderer
│   └── ProcuredataLogo.tsx            # Procuredata SVG logo
│
├── utils/
│   └── generateItbidDocTecnicoPDF.ts  # PDF generator
│
└── assets/
    ├── itbid-logo.png
    ├── agile-procurement-logo.png
    └── kit-espacios-datos-logo.png
```

## Installation Steps

### 1. Install Dependencies

```bash
npm install framer-motion mermaid jspdf lucide-react date-fns canvas-confetti next-themes
```

Also ensure you have these shadcn/ui components installed:
- `npx shadcn-ui@latest add card badge button table calendar radio-group dialog label`

### 2. Copy Files

```bash
# Components
cp -r components/* src/components/partners/itbid/doctecnico/

# Shared components (if not already present)
cp shared-components/AnimatedSection.tsx src/components/
cp shared-components/MermaidDiagram.tsx src/components/
cp shared-components/ProcuredataLogo.tsx src/components/

# Page
cp page/ItbidDocTecnico.tsx src/pages/partners/

# Utils
cp utils/generateItbidDocTecnicoPDF.ts src/utils/

# Assets
cp assets/* src/assets/
```

### 3. Add CSS Variables

Add the following to your `src/index.css` inside `:root`:

```css
/* ITBID Brand Colors */
--itbid-cyan: 187 100% 42%;
--itbid-lime: 66 68% 54%;
--itbid-magenta: 340 82% 52%;
--itbid-purple: 262 52% 47%;
--itbid-navy: 210 50% 24%;
```

### 4. Add Route

In your `App.tsx` or router configuration:

```tsx
import ItbidDocTecnico from "@/pages/partners/ItbidDocTecnico";

// Add route
<Route path="/partners/itbid/doc-tecnico" element={<ItbidDocTecnico />} />
```

### 5. Update Imports (if needed)

If your project structure differs, update the imports in:
- Component imports for UI components (`@/components/ui/*`)
- Utility imports (`@/lib/utils`, `@/lib/cn`)
- Supabase client (`@/integrations/supabase/client`)
- Toast hooks (`@/hooks/use-toast`)

## Features

- **13 Sections**: Complete technical document with navigation
- **5 Mermaid Diagrams**: Interactive architecture and flow diagrams
- **PDF Export**: Download complete document as PDF
- **Mobile Responsive**: Full mobile menu and responsive design
- **Dark/Light Theme**: Theme-aware colors and diagrams
- **Demo Scheduler**: Built-in demo booking dialog (requires Supabase edge function)

## Customization

### Changing Colors
Update the CSS variables in `index.css` to match your brand.

### Modifying Content
Edit the data arrays in each component to change:
- Titles and descriptions
- Bullet points and features
- Comparison tables
- Diagram content

### Removing Demo Scheduler
If you don't need the demo booking feature:
1. Remove `DemoSchedulerDialog.tsx`
2. Remove the demo button from `DocCTA.tsx`
3. Remove Supabase client import if not needed elsewhere

## Requirements

- React 18+
- TypeScript
- Tailwind CSS
- Vite (recommended)
- Supabase (optional, for demo scheduling)

## License

MIT - Feel free to use and modify for your projects.
