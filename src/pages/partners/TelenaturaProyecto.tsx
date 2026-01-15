import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import { generateTelenaturaProyectoPDF } from "@/utils/generateTelenaturaProyectoPDF";
import { HeroSection } from "@/components/partners/telenatura/HeroSection";
import { ProblemSection } from "@/components/partners/telenatura/ProblemSection";
import { SolutionSection } from "@/components/partners/telenatura/SolutionSection";
import { ArchitectureSection } from "@/components/partners/telenatura/ArchitectureSection";
import { UseCasesSection } from "@/components/partners/telenatura/UseCasesSection";
import { SuccessCasesSection } from "@/components/partners/telenatura/SuccessCasesSection";
import { DataSpaceKitSection } from "@/components/partners/telenatura/DataSpaceKitSection";
import { CTASection } from "@/components/partners/telenatura/CTASection";
import { GlobalNavigation } from "@/components/GlobalNavigation";

const TelenaturaProyecto = () => {
  const handleDownloadPDF = () => {
    toast.info("Generando PDF del proyecto...");
    setTimeout(() => {
      generateTelenaturaProyectoPDF();
      toast.success("PDF generado correctamente");
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Back Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GlobalNavigation />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/partners" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a Partners
              </Link>
            </Button>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="default" size="sm" onClick={handleDownloadPDF} className="flex items-center gap-2 bg-[hsl(var(--telenatura-green))] hover:bg-[hsl(var(--telenatura-green)/0.9)]">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button variant="secondary" size="sm" disabled className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Doc Proyecto
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/telenatura/doc-tecnico" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Doc Técnico
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/partners/telenatura/whitepaper" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                White Paper
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-0">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ArchitectureSection />
        <UseCasesSection />
        <SuccessCasesSection />
        <DataSpaceKitSection />
        <CTASection />
      </div>
    </div>
  );
};

export default TelenaturaProyecto;
