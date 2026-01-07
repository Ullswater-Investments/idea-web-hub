import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Award, 
  Factory, 
  Wheat, 
  Truck, 
  Heart, 
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Search,
  TrendingUp
} from "lucide-react";

const successCases = [
  {
    id: "gigafactory-north",
    title: "Automatización de Homologación Industrial",
    company: "GigaFactory North",
    sector: "Industrial",
    sectorIcon: Factory,
    metric: "-85%",
    metricLabel: "Tiempo de Alta",
    description: "De 22 días a 48 horas en el proceso de homologación de proveedores Tier 2.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
    blockchainProof: "0x8f3c...b2e1"
  },
  {
    id: "olivetrust-coop",
    title: "Trazabilidad ESG para Exportación",
    company: "OliveTrust Coop",
    sector: "Agroalimentario",
    sectorIcon: Wheat,
    metric: "+12%",
    metricLabel: "Valor Exportación",
    description: "Certificación de huella hídrica para acceder al mercado alemán con precio premium.",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    blockchainProof: "0x3a1b...f9d4"
  },
  {
    id: "urbandeliver-bcn",
    title: "Reporting Scope 3 Instantáneo",
    company: "UrbanDeliver BCN",
    sector: "Movilidad Sostenible",
    sectorIcon: Truck,
    metric: "1h",
    metricLabel: "Auditoría CSRD",
    description: "Generación de informe de emisiones Scope 3 para acceso a crédito verde bancario.",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    textColor: "text-teal-600 dark:text-teal-400",
    blockchainProof: "0x5d41...7c59"
  },
  {
    id: "alianza-social-hub",
    title: "Medición de Impacto Social",
    company: "Alianza Social Hub",
    sector: "Economía Social",
    sectorIcon: Heart,
    metric: "1:3.8",
    metricLabel: "Ratio SROI",
    description: "Demostración verificada del retorno social de inversión en proveedores éticos.",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    blockchainProof: "0x7e2f...a3c8"
  },
  {
    id: "biomed-hospital",
    title: "Continuidad Asistencial Garantizada",
    company: "BioMed Hospital",
    sector: "Salud",
    sectorIcon: Stethoscope,
    metric: "100%",
    metricLabel: "Uptime Equipos",
    description: "Mantenimiento predictivo de equipos de diagnóstico con datasets verificados.",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400",
    blockchainProof: "0x9b4d...c1e7"
  }
];

const SuccessStories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = [...new Set(successCases.map(c => c.sector))];

  const filteredCases = successCases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedSector || c.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Award className="w-4 h-4" />
              Casos de Éxito Verificados
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Transformación Digital en{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Compras Empresariales
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cómo empresas líderes han reducido costes, acelerado procesos y 
              demostrado su impacto ESG con la plataforma ProcureData.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por empresa o título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedSector === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedSector(null)}
            >
              Todos
            </Badge>
            {sectors.map(sector => (
              <Badge
                key={sector}
                variant={selectedSector === sector ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedSector(sector)}
              >
                {sector}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <Link key={caseItem.id} to={`/success-stories/${caseItem.id}`}>
              <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                {/* Header with gradient */}
                <div className={`h-2 bg-gradient-to-r ${caseItem.color}`} />
                
                <CardContent className="p-6 space-y-4">
                  {/* Sector Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${caseItem.bgColor} ${caseItem.textColor}`}>
                      <caseItem.sectorIcon className="w-3 h-3" />
                      {caseItem.sector}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                      <ShieldCheck className="w-3 h-3 text-green-500" />
                      {caseItem.blockchainProof}
                    </div>
                  </div>

                  {/* Company & Title */}
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{caseItem.company}</p>
                    <h3 className="text-lg font-bold mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {caseItem.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {caseItem.description}
                  </p>

                  {/* Metric Highlight */}
                  <div className="pt-4 border-t flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        {caseItem.metricLabel}
                      </p>
                      <p className={`text-2xl font-bold bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}>
                        {caseItem.metric}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-16">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No se encontraron casos</h3>
            <p className="text-muted-foreground">Prueba con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;
