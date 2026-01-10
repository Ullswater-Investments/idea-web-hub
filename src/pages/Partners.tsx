import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, ExternalLink, FileText, Building2, Globe, Car, Zap, Building, Database, Target, Factory, Bolt } from "lucide-react";
import itbidLogo from "@/assets/itbid-logo.png";

interface Partner {
  id: string;
  name: string;
  fullName?: string;
  description: string;
  logo: string | null;
  link: string;
  status: "activo" | "próximamente" | "en desarrollo";
  sector: string;
  hasDocTecnico?: boolean;
  keyInitiative?: string;
  priority?: "inmediato" | "masa_critica" | "quick_win";
}

interface CountryData {
  name: string;
  flag: string;
  partners: Partner[];
}

const partnersByCountry: CountryData[] = [
  {
    name: "España",
    flag: "🇪🇸",
    partners: [
      {
        id: "itbid",
        name: "ITBID",
        description: "Plataforma líder de licitaciones y contratación pública. Colaboración estratégica para proyectos de datos en el sector público.",
        logo: itbidLogo,
        link: "/partners/itbid/proyecto",
        status: "activo",
        sector: "Sector Público",
        hasDocTecnico: true,
      },
      {
        id: "partner-es-2",
        name: "Partner España 2",
        description: "Colaboración estratégica en el ecosistema de datos español. Especialización en soluciones empresariales.",
        logo: null,
        link: "/partners/es-2/proyecto",
        status: "próximamente",
        sector: "Enterprise",
      },
      {
        id: "partner-es-3",
        name: "Partner España 3",
        description: "Innovación en espacios de datos para la industria española. Proyectos de transformación digital.",
        logo: null,
        link: "/partners/es-3/proyecto",
        status: "próximamente",
        sector: "Industria",
      },
    ],
  },
  {
    name: "Alemania",
    flag: "🇩🇪",
    partners: [
      {
        id: "vda",
        name: "VDA",
        fullName: "Verband der Automobilindustrie",
        description: "Creadores de estándares globales como TISAX para seguridad de datos. Enfoque obsesivo en cadena de suministro conectada para proveedores Tier-2 y Tier-3.",
        logo: null,
        link: "/partners/vda/proyecto",
        status: "en desarrollo",
        sector: "Automoción",
        keyInitiative: "TISAX, Catena-X",
        priority: "masa_critica",
      },
      {
        id: "bdew",
        name: "BDEW",
        fullName: "Bundesverband der Energie- und Wasserwirtschaft",
        description: "Gestionan el estándar MaKo, protocolo oficial de intercambio de datos energéticos en Alemania. Ventaja competitiva técnica para validación energética.",
        logo: null,
        link: "/partners/bdew/proyecto",
        status: "en desarrollo",
        sector: "Energía",
        keyInitiative: "MaKo (Marktkommunikation)",
        priority: "inmediato",
      },
      {
        id: "hdb",
        name: "HDB",
        fullName: "Hauptverband der Deutschen Bauindustrie",
        description: "Lideran el road map federal de BIM (Building Information Modeling). Socio natural para compras de materiales con soporte BIM.",
        logo: null,
        link: "/partners/hdb/proyecto",
        status: "próximamente",
        sector: "Construcción",
        keyInitiative: "BIM Federal Roadmap",
      },
    ],
  },
  {
    name: "Italia",
    flag: "🇮🇹",
    partners: [
      {
        id: "ance",
        name: "ANCE",
        fullName: "Associazione Nazionale Costruttori Edili",
        description: "Han creado DIHCUBE (Digital Italian Hub for Construction), hub de innovación digital específico para construcción italiana.",
        logo: null,
        link: "/partners/ance/proyecto",
        status: "en desarrollo",
        sector: "Construcción",
        keyInitiative: "DIHCUBE",
        priority: "inmediato",
      },
      {
        id: "anfia",
        name: "ANFIA",
        fullName: "Filiera Industria Automobilistica",
        description: "División específica de Car Design & Engineering y componentes. Perfectos para datos de propiedad intelectual y diseño industrial.",
        logo: null,
        link: "/partners/anfia/proyecto",
        status: "próximamente",
        sector: "Automoción",
        keyInitiative: "Car Design & Engineering",
        priority: "masa_critica",
      },
      {
        id: "elettricita-futura",
        name: "Elettricità Futura",
        description: "Representan el 70% del mercado eléctrico italiano. Puerta de entrada para datos de transición energética y renovables en el sur de Europa.",
        logo: null,
        link: "/partners/elettricita-futura/proyecto",
        status: "próximamente",
        sector: "Energía",
      },
    ],
  },
  {
    name: "Francia",
    flag: "🇫🇷",
    partners: [
      {
        id: "pfa",
        name: "PFA",
        fullName: "Plateforme Automobile",
        description: "No es solo asociación, es plataforma estratégica que une fabricantes y estado. Foco en innovación y competitividad nacional.",
        logo: null,
        link: "/partners/pfa/proyecto",
        status: "en desarrollo",
        sector: "Automoción",
        keyInitiative: "Soberanía del Dato",
        priority: "masa_critica",
      },
      {
        id: "ufe",
        name: "UFE",
        fullName: "Union Française de l'Électricité",
        description: "Plan de Acción de Electrificación masivo. Buscan herramientas digitales para gestión de huella energética empresarial.",
        logo: null,
        link: "/partners/ufe/proyecto",
        status: "próximamente",
        sector: "Energía",
        keyInitiative: "Plan de Electrificación",
      },
      {
        id: "ffb",
        name: "FFB",
        fullName: "Fédération Française du Bâtiment",
        description: "50.000 miembros, incluyendo 35.000 artesanos/PYMEs. Plan de Transición Digital (PTNB) activo, buscan herramientas sencillas.",
        logo: null,
        link: "/partners/ffb/proyecto",
        status: "próximamente",
        sector: "Construcción",
        keyInitiative: "PTNB",
        priority: "quick_win",
      },
    ],
  },
  {
    name: "Países Bajos",
    flag: "🇳🇱",
    partners: [
      {
        id: "edsn",
        name: "EDSN",
        fullName: "Energie Data Services Nederland",
        description: "No es asociación clásica, es LA ENTIDAD que gestiona el hub central de datos de energía de Holanda. Conexión directa = validación energética automática.",
        logo: null,
        link: "/partners/edsn/proyecto",
        status: "en desarrollo",
        sector: "Data Hub",
        keyInitiative: "Hub Central de Datos",
        priority: "inmediato",
      },
      {
        id: "rai-vereniging",
        name: "RAI Vereniging",
        fullName: "RAI Automotive Industry NL",
        description: "Muy enfocados en movilidad inteligente y datos de vehículos conectados. Líderes en innovación de transporte.",
        logo: null,
        link: "/partners/rai/proyecto",
        status: "próximamente",
        sector: "Automoción",
        keyInitiative: "Movilidad Inteligente",
      },
    ],
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    partners: [
      {
        id: "aiccopn",
        name: "AICCOPN",
        fullName: "Associação dos Industriais da Construção Civil e Obras Públicas",
        description: "Proyecto 'Construção Q+', enfocado en cualificar y digitalizar empresas del sector. Plataforma ideal para Cualificación de Proveedores.",
        logo: null,
        link: "/partners/aiccopn/proyecto",
        status: "próximamente",
        sector: "Construcción",
        keyInitiative: "Construção Q+",
        priority: "quick_win",
      },
      {
        id: "mobinov",
        name: "MOBINOV",
        fullName: "Cluster Automóvel de Portugal",
        description: "Cluster Automóvil de Portugal. Agilidad envidiable para proyectos piloto de Industria 4.0 y transformación digital.",
        logo: null,
        link: "/partners/mobinov/proyecto",
        status: "próximamente",
        sector: "Automoción",
        keyInitiative: "Cluster Automóvil PT",
        priority: "quick_win",
      },
    ],
  },
  {
    name: "Bélgica",
    flag: "🇧🇪",
    partners: [
      {
        id: "embuild",
        name: "Embuild",
        fullName: "ex-Confederación de la Construcción",
        description: "Rebrand total hacia sostenibilidad y digitalización. Los más vocales en Bruselas sobre necesidad de digitalizar la construcción.",
        logo: null,
        link: "/partners/embuild/proyecto",
        status: "próximamente",
        sector: "Construcción",
        keyInitiative: "Sostenibilidad Digital",
      },
    ],
  },
];

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
  if (lowerSector.includes("automó") || lowerSector.includes("auto")) {
    return <Car className="h-3 w-3" />;
  }
  if (lowerSector.includes("energ")) {
    return <Zap className="h-3 w-3" />;
  }
  if (lowerSector.includes("constru")) {
    return <Building className="h-3 w-3" />;
  }
  if (lowerSector.includes("data") || lowerSector.includes("hub")) {
    return <Database className="h-3 w-3" />;
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
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-muted to-muted/50 border border-border flex items-center justify-center">
              <Building2 className="h-8 w-8 text-muted-foreground/60" />
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

const CountrySection = ({ country }: { country: CountryData }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <span className="text-2xl">{country.flag}</span>
      <h3 className="text-lg font-semibold">{country.name}</h3>
      <div className="flex-1 h-px bg-border" />
      <Badge variant="outline" className="text-xs">
        {country.partners.length} {country.partners.length === 1 ? "partner" : "partners"}
      </Badge>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {country.partners.map((partner) => (
        <PartnerCard key={partner.id} partner={partner} />
      ))}
    </div>
  </div>
);

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
