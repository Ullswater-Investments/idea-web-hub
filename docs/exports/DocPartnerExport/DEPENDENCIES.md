# Dependencies - ITBID Technical Document

## Required NPM Packages

### Core Dependencies

```bash
npm install framer-motion mermaid jspdf lucide-react date-fns canvas-confetti next-themes
```

| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | ^12.x | Animation library for smooth transitions |
| `mermaid` | ^11.x | Diagram rendering (flowcharts, sequence diagrams) |
| `jspdf` | ^3.x | PDF generation for document export |
| `lucide-react` | ^0.4x | Icon library |
| `date-fns` | ^3.x | Date formatting and manipulation |
| `canvas-confetti` | ^1.x | Celebration effect on demo booking |
| `next-themes` | ^0.3.x | Theme switching (light/dark mode) |

### shadcn/ui Components

Run these commands to add required UI components:

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add button
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add label
npx shadcn-ui@latest add tabs
```

### Already Installed (Typical Lovable Project)

These are usually pre-installed in a Lovable project:

- `react` ^18.x
- `react-dom` ^18.x
- `react-router-dom` ^6.x
- `tailwindcss` ^3.x
- `typescript` ^5.x
- `@radix-ui/*` (via shadcn/ui)
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

### Optional Dependencies

Only needed if using specific features:

```bash
# For demo scheduling (requires Supabase)
npm install @supabase/supabase-js

# For toast notifications
# (Usually included with shadcn/ui toast component)
```

## Type Dependencies

```bash
npm install -D @types/canvas-confetti
```

## Peer Dependencies

Make sure your project has these configured:

- Tailwind CSS with proper config
- TypeScript with path aliases (`@/` pointing to `src/`)
- Vite or similar bundler configured

## Package.json Snippet

```json
{
  "dependencies": {
    "framer-motion": "^12.23.24",
    "mermaid": "^11.12.2",
    "jspdf": "^3.0.4",
    "lucide-react": "^0.462.0",
    "date-fns": "^3.6.0",
    "canvas-confetti": "^1.9.4",
    "next-themes": "^0.3.0"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.9.0"
  }
}
```

## Troubleshooting

### Mermaid SSR Issues
If you encounter SSR issues with Mermaid:
```tsx
// Add dynamic import
import dynamic from 'next/dynamic';
const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { ssr: false });
```

### Framer Motion Bundle Size
For smaller bundle, import specific features:
```tsx
import { motion, AnimatePresence } from 'framer-motion';
```

### jsPDF Large Bundle
The PDF generator adds ~200KB to bundle. Consider lazy loading:
```tsx
const generatePDF = async () => {
  const { generateItbidDocTecnicoPDF } = await import('@/utils/generateItbidDocTecnicoPDF');
  generateItbidDocTecnicoPDF();
};
```
