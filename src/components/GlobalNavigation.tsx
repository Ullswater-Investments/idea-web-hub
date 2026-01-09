import { Link, useNavigate } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GlobalNavigation() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1">
      {/* Botón Atrás */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="h-8 w-8 p-0"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Atrás</TooltipContent>
      </Tooltip>

      {/* Botón Home */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link to="/" aria-label="Ir a inicio">
              <Home className="h-4 w-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Inicio</TooltipContent>
      </Tooltip>

      {/* Botón Adelante */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(1)}
            className="h-8 w-8 p-0"
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Adelante</TooltipContent>
      </Tooltip>
    </div>
  );
}
