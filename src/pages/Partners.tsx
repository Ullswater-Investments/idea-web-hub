import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, ExternalLink, FileText, Building2, Globe, Car, Zap, Building, Database, 
  Target, Factory, Bolt, ShoppingCart, Wheat, Tractor, FlaskConical, Cog,
  Cpu, Plane, HeartPulse, Ship, Network, Shield, Shirt, UtensilsCrossed, Boxes, Sparkles,
  BookOpen
} from "lucide-react";
import { partnersByCountry, Partner, CountryData } from "@/data/partnersData";

const getStatusBadge = (status: Partner["status"]) => {
  switch (status) {
    case "activo":
      return (
        <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
          activo
        </Badge>
      );
    case "próximamente":
      return (
        <Badge variant="default" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
          próximamente
        </Badge>
      );
    case "en desarrollo":
      return (
        <Badge variant="default" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
          en desarrollo
        </Badge>
      );
  }
};

const getSectorIcon = (sector: string) => {
  const lowerSector = sector.toLowerCase();
  
  // Tecnología/Semiconductores
  if (lowerSector.includes("semicon") || lowerSector.includes("electrón") || lowerSector.includes("electrónica")) {
    return <Cpu className="h-3 w-3" />;
  }
  // Aeroespacial
  if (lowerSector.includes("aero") || lowerSector.includes("aviación") || lowerSector.includes("espacio")) {
    return <Plane className="h-3 w-3" />;
  }
  // Salud/Biotech
  if (lowerSector.includes("salud") || lowerSector.includes("bio") || lowerSector.includes("médic") || lowerSector.includes("health")) {
    return <HeartPulse className="h-3 w-3" />;
  }
  // Logística/Puerto
  if (lowerSector.includes("logíst") || lowerSector.includes("puerto") || lowerSector.includes("port")) {
    return <Ship className="h-3 w-3" />;
  }
  // Smart City/IoT/Deep Tech
  if (lowerSector.includes("smart") || lowerSector.includes("iot") || lowerSector.includes("deep")) {
    return <Network className="h-3 w-3" />;
  }
  // Seguridad
  if (lowerSector.includes("segur") || lowerSector.includes("security")) {
    return <Shield className="h-3 w-3" />;
  }
  // Textil
  if (lowerSector.includes("textil") || lowerSector.includes("moda")) {
    return <Shirt className="h-3 w-3" />;
  }
  // Alimentación
  if (lowerSector.includes("aliment") || lowerSector.includes("food")) {
    return <UtensilsCrossed className="h-3 w-3" />;
  }
  // Materiales/Cerámica
  if (lowerSector.includes("material") || lowerSector.includes("cerámica")) {
    return <Boxes className="h-3 w-3" />;
  }
  // Industria 4.0/Packaging/Maquinaria Industrial
  if (lowerSector.includes("industria 4") || lowerSector.includes("packaging") || lowerSector.includes("maquinaria industrial")) {
    return <Factory className="h-3 w-3" />;
  }
  // Tecnología general
  if (lowerSector.includes("tecnología") || lowerSector.includes("tech") || lowerSector.includes("tic")) {
    return <Cpu className="h-3 w-3" />;
  }
  // Automoción
  if (lowerSector.includes("automó") || lowerSector.includes("auto") || lowerSector.includes("lujo")) {
    return <Car className="h-3 w-3" />;
  }
  // Energía
  if (lowerSector.includes("energ")) {
    return <Zap className="h-3 w-3" />;
  }
  // Construcción
  if (lowerSector.includes("constru")) {
    return <Building className="h-3 w-3" />;
  }
  // Data Hub
  if (lowerSector.includes("data") || lowerSector.includes("hub")) {
    return <Database className="h-3 w-3" />;
  }
  // Compras/Logística
  if (lowerSector.includes("compra") || lowerSector.includes("procurement") || lowerSector.includes("logística")) {
    return <ShoppingCart className="h-3 w-3" />;
  }
  // Agricultura
  if (lowerSector.includes("agri") || lowerSector.includes("agro")) {
    return <Wheat className="h-3 w-3" />;
  }
  // Maquinaria Agrícola
  if (lowerSector.includes("maquin") || lowerSector.includes("tractor")) {
    return <Tractor className="h-3 w-3" />;
  }
  // Química
  if (lowerSector.includes("quím") || lowerSector.includes("chem")) {
    return <FlaskConical className="h-3 w-3" />;
  }
  // Metalurgia
  if (lowerSector.includes("metal")) {
    return <Cog className="h-3 w-3" />;
  }
  
  return <Building2 className="h-3 w-3" />;
};

const getPriorityBadge = (priority?: Partner["priority"]) => {
  if (!priority) return null;
  
  switch (priority) {
    case "inmediato":
      return (
        <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
          <Target className="h-3 w-3 mr-1" />
          Objetivo Inmediato
        </Badge>
      );
    case "masa_critica":
      return (
        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/30">
          <Factory className="h-3 w-3 mr-1" />
          Masa Crítica
        </Badge>
      );
    case "quick_win":
      return (
        <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-600 border-orange-500/30">
          <Bolt className="h-3 w-3 mr-1" />
          Quick Win
        </Badge>
      );
  }
};

const getTypeBadge = (type?: Partner["type"]) => {
  if (type === "clúster") {
    return (
      <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/30">
        <Sparkles className="h-3 w-3 mr-1" />
        Clúster
      </Badge>
    );
  }
  return null;
};

const PartnerCard = ({ partner }: { partner: Partner }) => (
  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 flex flex-col">
    <CardHeader className="space-y-3 flex-1">
      <div className="flex items-center justify-between">
        <div className="h-16 flex items-center">
          {partner.logo ? (
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-full w-auto object-contain"
            />
          ) : (
            <div className={`h-16 w-16 rounded-xl border border-border flex items-center justify-center ${
              partner.type === "clúster" 
                ? "bg-gradient-to-br from-purple-500/10 to-purple-500/5" 
                : "bg-gradient-to-br from-muted to-muted/50"
            }`}>
              {partner.type === "clúster" ? (
                <Sparkles className="h-8 w-8 text-purple-500/60" />
              ) : (
                <Building2 className="h-8 w-8 text-muted-foreground/60" />
              )}
            </div>
          )}
        </div>
        {getStatusBadge(partner.status)}
      </div>
      <div className="space-y-2">
        <CardTitle className="text-xl">{partner.name}</CardTitle>
        {partner.fullName && (
          <p className="text-sm text-muted-foreground font-medium">
            {partner.fullName}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {getSectorIcon(partner.sector)}
            <span className="ml-1">{partner.sector}</span>
          </Badge>
          {getTypeBadge(partner.type)}
          {getPriorityBadge(partner.priority)}
        </div>
        <CardDescription className="mt-2 line-clamp-3">
          {partner.description}
        </CardDescription>
        {partner.keyInitiative && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">💡 Iniciativa:</span> {partner.keyInitiative}
            </p>
          </div>
        )}
      </div>
    </CardHeader>
    <CardFooter className="flex flex-col gap-2 pt-0">
      <Button 
        asChild 
        className="w-full group-hover:bg-primary/90"
        disabled={partner.status !== "activo"}
      >
        <Link to={partner.link} className="flex items-center gap-2">
          Acceder a proyectos
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>
      {partner.hasDocTecnico && (
        <Button 
          asChild 
          variant="outline"
          className="w-full border-border text-muted-foreground hover:bg-muted hover:text-primary hover:border-primary/50"
        >
          <Link to="/partners/itbid/doc-tecnico" className="flex items-center gap-2">
            Doc Técnico
            <FileText className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </CardFooter>
  </Card>
);

const CountrySection = ({ country }: { country: CountryData }) => {
  const associations = country.partners.filter(p => p.type !== "clúster");
  const clusters = country.partners.filter(p => p.type === "clúster");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{country.flag}</span>
        <h3 className="text-lg font-semibold">{country.name}</h3>
        <div className="flex-1 h-px bg-border" />
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">
            {associations.length} asociaciones
          </Badge>
          {clusters.length > 0 && (
            <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/30">
              {clusters.length} clústeres
            </Badge>
          )}
        </div>
      </div>
      
      {/* Asociaciones */}
      {associations.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Asociaciones Sectoriales
          </h4>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {associations.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      )}
      
      {/* Clústeres */}
      {clusters.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-purple-600 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Clústeres Empresariales
          </h4>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clusters.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Partners = () => {
  const totalPartners = partnersByCountry.reduce((acc, country) => acc + country.partners.length, 0);
  const activePartners = partnersByCountry.reduce(
    (acc, country) => acc + country.partners.filter((p) => p.status === "activo").length,
    0
  );
  const inDevelopment = partnersByCountry.reduce(
    (acc, country) => acc + country.partners.filter((p) => p.status === "en desarrollo").length,
    0
  );

  // Count by type
  const associationsCount = partnersByCountry.reduce(
    (acc, country) => acc + country.partners.filter((p) => p.type !== "clúster").length,
    0
  );
  const clustersCount = partnersByCountry.reduce(
    (acc, country) => acc + country.partners.filter((p) => p.type === "clúster").length,
    0
  );

  // Count by priority
  const inmediatoCount = partnersByCountry.reduce(
    (acc, country) => acc + country.partners.filter((p) => p.priority === "inmediato").length,
    0
  );
  const masaCriticaCount = partnersByCountry.reduce(
    (acc, country) => acc + country.partners.filter((p) => p.priority === "masa_critica").length,
    0
  );
  const quickWinCount = partnersByCountry.reduce(
    (acc, country) => acc + country.partners.filter((p) => p.priority === "quick_win").length,
    0
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Premium Partners Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-[2px]">
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-8 md:px-10 md:py-10">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm font-medium uppercase tracking-widest text-amber-400">
                  Programa Exclusivo
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  PROCUREDATA <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">PREMIUM PARTNERS</span>
                </h2>
                <p className="mt-1 text-slate-300 text-sm md:text-base">
                  Únete al ecosistema líder en espacios de datos de la UE
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link to="/premium-partners">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Visita Nuestro Programa
                </Button>
              </Link>
              <Badge variant="outline" className="border-amber-400/50 text-amber-400 bg-amber-400/10 px-3 py-1">
                🏆 70+ Partners Activos
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <Handshake className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Partners</h1>
            <p className="text-muted-foreground">Ecosistema de colaboración estratégica en la UE</p>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Globe className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                La sección <span className="font-semibold text-primary">Partners</span> de PROCUREDATA está dirigida a 
                proyectos desarrollados en colaboración con nuestros partners estratégicos en toda la Unión Europea. 
                Cada partner dispone de un espacio dedicado con funcionalidades específicas, proyectos exclusivos y 
                acceso a datos compartidos bajo estrictos protocolos de gobernanza.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-sm">
                  {totalPartners} partners totales
                </Badge>
                <Badge variant="default" className="text-sm bg-green-500/10 text-green-600 border-green-500/20">
                  {activePartners} activos
                </Badge>
                <Badge variant="default" className="text-sm bg-blue-500/10 text-blue-600 border-blue-500/20">
                  {inDevelopment} en desarrollo
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {partnersByCountry.length} países
                </Badge>
              </div>
              
              {/* Tipos de Partner */}
              <div className="pt-2 border-t border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-2">Tipos de Partner:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Building2 className="h-3 w-3 mr-1" />
                    {associationsCount} Asociaciones Sectoriales
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/30">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {clustersCount} Clústeres Empresariales
                  </Badge>
                </div>
              </div>
              
              {/* Prioridades Estratégicas */}
              <div className="pt-2 border-t border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-2">Prioridades Estratégicas:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                    <Target className="h-3 w-3 mr-1" />
                    {inmediatoCount} Objetivo Inmediato
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/30">
                    <Factory className="h-3 w-3 mr-1" />
                    {masaCriticaCount} Masa Crítica
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-600 border-orange-500/30">
                    <Bolt className="h-3 w-3 mr-1" />
                    {quickWinCount} Quick Win
                  </Badge>
                </div>
              </div>
              
              {/* Documentación del Ecosistema */}
              <div className="pt-3 border-t border-border/50">
                <Link to="/docs/partners">
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Ver Documentación Técnica del Ecosistema
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partners por País */}
      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Directorio de Partners por País</h2>
        
        {partnersByCountry.map((country) => (
          <CountrySection key={country.name} country={country} />
        ))}

        {/* Placeholder para futuros países */}
        <Card className="border-dashed border-2 bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Globe className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground font-medium">
              Próximamente más países
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Estamos expandiendo nuestro ecosistema a toda la Unión Europea
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Partners;
