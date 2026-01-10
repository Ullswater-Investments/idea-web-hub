import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { 
  Download, 
  Users, 
  Menu, 
  X, 
  Home, 
  ArrowRight,
  Globe,
  Building2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import partnersDocContent from '../../docs/PARTNERS_ECOSYSTEM.md?raw';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

const PartnersDoc = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();

  const tableOfContents = useMemo(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const toc: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(partnersDocContent)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      toc.push({ id, title, level });
    }

    return toc;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsSidebarOpen(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([partnersDocContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PARTNERS_ECOSYSTEM_PROCUREDATA.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Documento descargado",
      description: "PARTNERS_ECOSYSTEM_PROCUREDATA.md se ha descargado correctamente",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <Link to="/" className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg hidden sm:inline">PROCUREDATA</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Globe className="h-3 w-3 mr-1" />
                7 Países
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Building2 className="h-3 w-3 mr-1" />
                70 Partners
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Descargar MD</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72
            border-r bg-background transition-transform duration-300
            lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <ScrollArea className="h-full py-6 px-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Contenido
              </h2>
            </div>
            <nav className="space-y-1">
              {tableOfContents.map(({ id, title, level }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`
                    w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors
                    hover:bg-muted hover:text-foreground
                    ${level === 1 ? "font-semibold" : level === 2 ? "pl-4" : "pl-6 text-muted-foreground"}
                    ${activeSection === id ? "bg-primary/10 text-primary font-medium" : ""}
                  `}
                >
                  {title.length > 35 ? `${title.substring(0, 35)}...` : title}
                </button>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-8 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Document Header */}
            <div className="mb-8 pb-6 border-b">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Link to="/" className="hover:text-foreground">Inicio</Link>
                <span>/</span>
                <Link to="/partners" className="hover:text-foreground">Partners</Link>
                <span>/</span>
                <span className="text-foreground">Documentación</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Ecosistema de Partners Estratégicos
              </h1>
              <p className="text-muted-foreground text-lg">
                Documentación completa del ecosistema PROCUREDATA: 70 partners en 7 países de la Unión Europea, 
                incluyendo asociaciones sectoriales y clústeres empresariales.
              </p>
            </div>

            {/* Markdown Content */}
            <MarkdownRenderer 
              content={partnersDocContent} 
              className="prose-headings:scroll-mt-20"
            />

            {/* Footer Navigation */}
            <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-between">
              <Link to="/">
                <Button variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Volver al inicio
                </Button>
              </Link>
              <Link to="/partners">
                <Button>
                  Ver página de Partners
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnersDoc;
