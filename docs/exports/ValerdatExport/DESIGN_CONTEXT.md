# VALERDAT - Contexto de Diseño

## 🎯 Objetivo del Documento

Presentar la **Memoria de Ejecución** del proyecto VALERDAT Data-Driven como caso de servicio Consumer de PROCUREDATA, orientado a:

1. Justificación para la subvención "Kit Espacios de Datos"
2. Documentación técnica para stakeholders
3. Panel de seguimiento del proyecto

## 🎨 Identidad Visual

### Paleta de Colores Principal

| Color | Valor | Uso |
|-------|-------|-----|
| **Azul Principal** | `#2563eb` (blue-600) | CTAs, headers, progreso |
| **Azul Claro** | `#dbeafe` (blue-100) | Backgrounds, cards |
| **Azul Oscuro** | `#1e40af` (blue-800) | Hover states |

### Colores de Acento por Fase

| Fase | Color | Código |
|------|-------|--------|
| Mes 1 - Onboarding | Azul | `bg-blue-600` |
| Mes 2 - Preparación | Ámbar | `bg-amber-600` |
| Mes 3 - Integración | Púrpura | `bg-purple-600` |
| Mes 4 - Validación | Verde | `bg-green-600` |

### Colores de Estado

```css
/* Completado */
.completed { background: bg-green-100; color: text-green-600; }

/* En Progreso */
.in-progress { background: bg-blue-100; color: text-blue-600; }

/* Pendiente */
.pending { background: bg-slate-100; color: text-muted-foreground; }
```

## 🏗️ Arquitectura del Documento

### Secciones (7 componentes)

1. **Hero** - Progreso del proyecto + badges de verificación
2. **Servicio** - Definición del rol Consumer
3. **Arquitectura** - Diagrama Mermaid interactivo
4. **Dashboard** - Actividad + presupuesto + blockchain
5. **Cronograma** - Timeline de 4 meses
6. **KPIs** - Métricas de éxito
7. **CTA** - Próximos pasos

### Navegación

- **Desktop**: Sidebar sticky con scroll-spy
- **Mobile**: Menú hamburguesa con AnimatePresence
- **Scroll-to-top**: Botón flotante (aparece > 500px)

## 💼 Elementos Visuales Clave

### Widget de Identidad Web3

```
┌─────────────────────────────────┐
│ 🛡️ Identidad Verificada        │
│ did:ethr:valerdat:0x7a3...      │
│ [KYB Verificado] [SSI Activo]   │
└─────────────────────────────────┘
```

### Widget de Balance EUROe

```
┌─────────────────────────────────┐
│ 💳 Balance EUROe                │
│ 12,500 €                        │
│ Disponible para datasets        │
└─────────────────────────────────┘
```

### Diagrama Mermaid

El diagrama de arquitectura muestra:
- Ecosistema PROCUREDATA (verde)
- Capa de Confianza / Trust Layer (púrpura)
- Servicio a VALERDAT (ámbar)
- Cliente VALERDAT (azul)

## 📊 Componentes de Datos

### Tabla de Presupuesto

| Concepto | Tipo | Importe |
|----------|------|---------|
| Personal Propio | Interno | 5.000€ |
| Servicios PROCUREDATA | Externo | 6.000€ |
| Datasets Industriales | Externo | 3.000€ |
| Auditoría | Externo | 1.000€ |
| **Total** | | **15.000€** |

### KPIs de Éxito

| KPI | Meta | Indicador |
|-----|------|-----------|
| Enriquecimiento IA | 3+ datasets | Ingesta completada |
| Cumplimiento | 100% | GDPR + ODRL v2.2 |
| Trazabilidad | 100% | Pontus-X blockchain |
| Eficiencia | -80% | Tiempo integración |

## 🎭 Animaciones

### Framer Motion

```tsx
// Entrada por sección
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}

// Stagger para listas
transition={{ duration: 0.3, delay: index * 0.1 }}
```

### Scroll Reveal

- Cada sección aparece al entrar en viewport
- Cards con stagger delay (0.1s entre cada una)
- Botón scroll-to-top con scale animation

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Stack vertical, menú hamburguesa |
| Tablet (640-768px) | Grid 2 columnas, sidebar oculto |
| Desktop (>768px) | Sidebar sticky + contenido fluido |

### Sidebar Desktop

```css
.sidebar {
  width: 256px; /* w-64 */
  position: sticky;
  top: 80px; /* top-20 */
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
}
```

## 📄 Generación PDF

El PDF de 8 páginas mantiene consistencia visual:

- Colores: Mismo azul #2563eb
- Fuentes: Sistema (Helvetica)
- Layout: A4 vertical con márgenes 25mm
- Footer: Número de página + branding

---

*Diseño orientado a documentación empresarial para justificación de subvenciones*
