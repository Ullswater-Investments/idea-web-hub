import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, ExternalLink, FileText, Building2, Globe } from "lucide-react";
import itbidLogo from "@/assets/itbid-logo.png";

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  link: string;
  status: "activo" | "próximamente" | "en desarrollo";
  sector?: string;
  hasDocTecnico?: boolean;
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
    name: "Portugal",
    flag: "🇵🇹",
    partners: [
      {
        id: "partner-pt-1",
        name: "Partner Portugal 1",
        description: "Líder en transformación digital en Portugal. Colaboración en proyectos de datos transfronterizos.",
        logo: null,
        link: "/partners/pt-1/proyecto",
        status: "próximamente",
        sector: "Tecnología",
      },
    ],
  },
  {
    name: "Francia",
    flag: "🇫🇷",
    partners: [
      {
        id: "partner-fr-1",
        name: "Partner Francia 1",
        description: "Innovación en el mercado francés de datos. Especialización en cumplimiento RGPD y Gaia-X.",
        logo: null,
        link: "/partners/fr-1/proyecto",
        status: "próximamente",
        sector: "Data Governance",
      },
    ],
  },
  {
    name: "Alemania",
    flag: "🇩🇪",
    partners: [
      {
        id: "partner-de-1",
        name: "Partner Alemania 1",
        description: "Referente en industria 4.0 y espacios de datos industriales. Conexión con el ecosistema Catena-X.",
        logo: null,
        link: "/partners/de-1/proyecto",
        status: "en desarrollo",
        sector: "Industria 4.0",
      },
    ],
  },
  {
    name: "Italia",
    flag: "🇮🇹",
    partners: [
      {
        id: "partner-it-1",
        name: "Partner Italia 1",
        description: "Especialización en sectores agroalimentario y manufacturero italiano. Proyectos de trazabilidad.",
        logo: null,
        link: "/partners/it-1/proyecto",
        status: "próximamente",
        sector: "Agroalimentario",
      },
    ],
  },
  {
    name: "Países Bajos",
    flag: "🇳🇱",
    partners: [
      {
        id: "partner-nl-1",
        name: "Partner Países Bajos 1",
        description: "Hub europeo de innovación en datos. Especialización en logística y cadena de suministro.",
        logo: null,
        link: "/partners/nl-1/proyecto",
        status: "en desarrollo",
        sector: "Logística",
      },
    ],
  },
  {
    name: "Bélgica",
    flag: "🇧🇪",
    partners: [
      {
        id: "partner-be-1",
        name: "Partner Bélgica 1",
        description: "Conexión con instituciones europeas. Proyectos de interoperabilidad y estándares de datos.",
        logo: null,
        link: "/partners/be-1/proyecto",
        status: "próximamente",
        sector: "Institucional",
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

const PartnerCard = ({ partner }: { partner: Partner }) => (
  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
    <CardHeader className="space-y-4">
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
      <div>
        <CardTitle className="text-xl">{partner.name}</CardTitle>
        {partner.sector && (
          <Badge variant="outline" className="mt-2 text-xs">
            {partner.sector}
          </Badge>
        )}
        <CardDescription className="mt-2">
          {partner.description}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent />
    <CardFooter className="flex flex-col gap-2">
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
          className="w-full border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-400"
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
            <div className="space-y-2">
              <p className="text-lg leading-relaxed">
                La sección <span className="font-semibold text-primary">Partners</span> de PROCUREDATA está dirigida a 
                proyectos desarrollados en colaboración con nuestros partners estratégicos en toda la Unión Europea. 
                Cada partner dispone de un espacio dedicado con funcionalidades específicas, proyectos exclusivos y 
                acceso a datos compartidos bajo estrictos protocolos de gobernanza.
              </p>
              <div className="flex gap-4 pt-2">
                <Badge variant="secondary" className="text-sm">
                  {totalPartners} partners totales
                </Badge>
                <Badge variant="default" className="text-sm bg-green-500/10 text-green-600 border-green-500/20">
                  {activePartners} activos
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {partnersByCountry.length} países
                </Badge>
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
