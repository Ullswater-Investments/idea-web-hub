import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

// Ordered list of all 52 success story case IDs
const orderedCaseIds = [
  // Original 7
  "gigafactory-north",
  "olivetrust-coop",
  "urbandeliver-bcn",
  "alianza-social-hub",
  "biomed-hospital",
  "globalretail-prime",
  "ecovolt-manufacturing",
  // Wave 2
  "sky-aero-systems",
  "vinosdoe-elite",
  "pharmacold-logistix",
  "portbcn-smart-trade",
  "ayuntamiento-etico",
  "purelithium-sourcing",
  "fastfashion-trace",
  "invoicetrust-b2b",
  "gridflow-energy",
  "ailabs-research",
  // Energy Wave
  "helios-fields",
  "aeolus-wind",
  "h2-pure",
  "social-hub-energy",
  "poligono-ecolink",
  "bateria-hub",
  "bioheat-district",
  "turbine-chain",
  "aquapower-nexus",
  "smartcharge-ev",
  // Circular Wave
  "fiber-loop",
  "rare-earth-recover",
  "alu-cycle",
  "producer-trust",
  "eco-orchestrator",
  "raw-market",
  "battery-life",
  "urban-mining",
  "waste-to-value",
  "gov-green-circular",
  // Agri-Tech Wave
  "avocado-trust",
  "olive-origin",
  "zero-chem-wine",
  "citrus-check",
  "berry-water",
  "rice-satellite",
  "bio-cotton-trace",
  "greenhouse-ai",
  "tropical-flash",
  "urban-hydro",
  // Tech/Finance Wave
  "datacloud-secure",
  "greenfinance-esg",
  "fleet-carbon-zero",
  "gov-net",
  "uni-synth",
  "kyc-sovereign",
  "global-bridge",
];

interface SuccessStoryNavButtonsProps {
  currentCaseId: string;
}

export const SuccessStoryNavButtons = ({ currentCaseId }: SuccessStoryNavButtonsProps) => {
  const currentIndex = orderedCaseIds.indexOf(currentCaseId);
  
  // Handle case when current ID is not in the ordered list
  const isValidIndex = currentIndex !== -1;
  
  const previousId = isValidIndex && currentIndex > 0 
    ? orderedCaseIds[currentIndex - 1] 
    : null;
  
  const nextId = isValidIndex && currentIndex < orderedCaseIds.length - 1 
    ? orderedCaseIds[currentIndex + 1] 
    : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-b border-border">
      {/* Previous Button */}
      <Button 
        variant="outline" 
        disabled={!previousId}
        asChild={!!previousId}
        className="w-full sm:w-auto"
      >
        {previousId ? (
          <Link to={`/success-stories/${previousId}`}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Caso Anterior
          </Link>
        ) : (
          <span>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Caso Anterior
          </span>
        )}
      </Button>

      {/* Home Button */}
      <Button variant="secondary" asChild className="w-full sm:w-auto">
        <Link to="/success-stories">
          <Home className="w-4 h-4 mr-2" />
          Todos los Casos
        </Link>
      </Button>

      {/* Next Button */}
      <Button 
        variant="outline" 
        disabled={!nextId}
        asChild={!!nextId}
        className="w-full sm:w-auto"
      >
        {nextId ? (
          <Link to={`/success-stories/${nextId}`}>
            Caso Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        ) : (
          <span>
            Caso Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </span>
        )}
      </Button>
    </div>
  );
};
