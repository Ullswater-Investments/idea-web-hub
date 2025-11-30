import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

// Mapeo de rutas a nombres amigables
const routeNames: Record<string, string> = {
  dashboard: "Panel de Control",
  catalog: "Catálogo de Datos",
  product: "Detalle del Producto",
  requests: "Gestión de Solicitudes",
  new: "Nueva Solicitud",
  data: "Mis Datos",
  view: "Vista de Datos",
  sustainability: "Sostenibilidad",
  services: "Servicios",
  innovation: "Innovation Lab",
  opportunities: "Oportunidades",
  reports: "Reportes",
  notifications: "Notificaciones",
  settings: "Configuración",
  "erp-config": "Configuración ERP",
  organization: "Organización",
  preferences: "Preferencias",
};

export function DynamicBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // No mostrar breadcrumbs en la raíz
  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Inicio</span>
      </Link>

      {pathnames.map((segment, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        
        // Si es un UUID o ID numérico, truncar
        const isId = /^[a-f0-9-]{36}$/i.test(segment) || /^\d+$/.test(segment);
        const displayName = isId 
          ? `Detalle (${segment.substring(0, 8)}...)` 
          : routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={to} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground">{displayName}</span>
            ) : (
              <Link
                to={to}
                className="hover:text-foreground transition-colors"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
