import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronUp, Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { generateValerdatDocPDF } from "@/utils/generateValerdatDocPDF";
import {
  ValerdatHero,
  ValerdatServicioDefinicion,
  ValerdatArquitectura,
  ValerdatDashboard,
  ValerdatCronograma,
  ValerdatKPIs,
  ValerdatCTA,
} from "@/components/partners/valerdat";

const sections = [
  { id: "hero", label: "Introducción" },
  { id: "servicio", label: "1. Definición del Servicio" },
  { id: "arquitectura", label: "2. Arquitectura" },
  { id: "dashboard", label: "3. Dashboard" },
  { id: "fases", label: "4. Cronograma" },
  { id: "kpis", label: "5. KPIs" },
  { id: "cta", label: "Próximos Pasos" },
];

const ValerdatDoc = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownloadPDF = () => {
    toast.info("Generando PDF del documento VALERDAT...");
    setTimeout(() => {
      generateValerdatDocPDF();
      toast.success("PDF generado correctamente");
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Inicio</span>
              </Link>
            </Button>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="default" size="sm" onClick={handleDownloadPDF} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-400"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleDownloadPDF} 
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-20 p-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              Contenido
            </p>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 text-blue-700 font-medium border-l-2 border-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Sections */}
        <main className="flex-1 min-w-0">
          <div id="hero">
            <ValerdatHero />
          </div>
          <div id="servicio">
            <ValerdatServicioDefinicion />
          </div>
          <div id="arquitectura">
            <ValerdatArquitectura />
          </div>
          <div id="dashboard">
            <ValerdatDashboard />
          </div>
          <div id="fases">
            <ValerdatCronograma />
          </div>
          <div id="kpis">
            <ValerdatKPIs />
          </div>
          <div id="cta">
            <ValerdatCTA />
          </div>
        </main>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValerdatDoc;
