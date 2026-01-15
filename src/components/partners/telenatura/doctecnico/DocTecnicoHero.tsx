import { Badge } from "@/components/ui/badge";
import { ProcuredataLogo } from "@/components/ProcuredataLogo";
import { Leaf } from "lucide-react";

export const DocTecnicoHero = () => (
  <section className="py-20 bg-gradient-to-br from-[hsl(var(--telenatura-green)/0.05)] to-background">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <ProcuredataLogo size="sm" />
        <span className="text-2xl text-muted-foreground">×</span>
        <span className="text-xl font-bold telenatura-gradient flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          TeleNatura EBT
        </span>
      </div>
      <Badge className="mb-4 bg-[hsl(var(--telenatura-green)/0.1)] text-[hsl(var(--telenatura-green))]">Documento Técnico v1.0</Badge>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Espacio de Datos <span className="telenatura-gradient">Agrícola Federado</span></h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Arquitectura técnica del espacio de datos telenatura-x dentro del ecosistema PROCUREDATA y Gaia-X.</p>
    </div>
  </section>
);
