import { useState } from 'react';
import { HeroSection } from '@/components/premium-partners/HeroSection';
import { ComparisonSlider } from '@/components/premium-partners/ComparisonSlider';
import { PartnerRoiCalculator } from '@/components/premium-partners/PartnerRoiCalculator';
import { GovernanceVisualizer } from '@/components/premium-partners/GovernanceVisualizer';
import { TechStackBento } from '@/components/premium-partners/TechStackBento';
import { OnboardingTimeline } from '@/components/premium-partners/OnboardingTimeline';
import { AdhesionForm } from '@/components/premium-partners/AdhesionForm';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePartnerProgramPDF } from '@/utils/generatePartnerProgramPDF';
const PremiumPartners = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Small delay for UX feedback
      await new Promise(resolve => setTimeout(resolve, 300));
      generatePartnerProgramPDF();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/partners" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Partners</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#simulator" className="text-sm text-slate-400 hover:text-white transition-colors">
              Simulador
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Gobernanza
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Tech Stack
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Roadmap
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isGeneratingPDF ? 'Generando...' : 'Descargar PDF'}
            </Button>
            
            <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              PREMIUM PARTNERS
            </Badge>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <HeroSection />
      <ComparisonSlider />
      <PartnerRoiCalculator />
      <GovernanceVisualizer />
      <TechStackBento />
      <OnboardingTimeline />
      <AdhesionForm />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">PROCUREDATA</p>
                <p className="text-slate-500 text-sm">Premium Partners Program</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link to="/docs/partners" className="hover:text-white transition-colors">
                Documentación
              </Link>
              <Link to="/partners" className="hover:text-white transition-colors">
                Ecosistema
              </Link>
              <a href="mailto:partners@procuredata.eu" className="hover:text-white transition-colors">
                Contacto
              </a>
            </div>

            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              🏆 70+ Partners Activos en la UE
            </Badge>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-600 text-sm">
            © {new Date().getFullYear()} ProcureData. Todos los derechos reservados. | 
            Programa financiado por fondos europeos y nacionales.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPartners;
